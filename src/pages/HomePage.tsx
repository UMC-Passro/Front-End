import { useCallback, useEffect, useMemo, useState } from "react";
import { accountApi } from "../apis/accountApi";
import { HomeDashboard } from "../components/home/HomeDashboard";
import { useApiRequest } from "../hooks/useApiRequest";
import type {
    ActiveDelivery,
    HomeContent,
    MatchingRequest,
    RecentHistory,
} from "../types/home";
import type { UserRole } from "../types/user";
import {
    getCurrentUser,
    getSelectedUserRole,
    setCurrentUserRole,
} from "../utils/auth";
import { getDeliveryStatusLabel } from "../utils/deliveryStatus";
import { SenderDeliveryListItem } from "../types/delivery/sender";
import {
    shipperDeliveryApi,
    ShipperDeliveryListItem,
} from "../apis/delivery/shipperDeliveryApi";
import { senderDeliveryApi } from "../apis";

type DeliveryRouteInfo = Pick<
    SenderDeliveryListItem,
    "originPlace" | "destPlace"
>;

function getPlaceLabel(
    delivery: DeliveryRouteInfo,
    key: "originPlace" | "destPlace",
) {
    const place = delivery[key];
    return `${place.subwayStationName}(${place.subwayRouteName})`;
}

function getRouteLabel(delivery: DeliveryRouteInfo) {
    return `${getPlaceLabel(delivery, "originPlace")} → ${getPlaceLabel(delivery, "destPlace")}`;
}

function isSenderActiveDelivery(delivery: SenderDeliveryListItem) {
    return delivery.status !== "DELIVERED" && delivery.status !== "CANCEL";
}

function toSenderActiveDelivery(
    delivery: SenderDeliveryListItem,
): ActiveDelivery {
    return {
        id: delivery.deliveryId,
        title: delivery.name ?? "이름 없는 물품",
        route: getRouteLabel(delivery),
        status: getDeliveryStatusLabel(delivery.status),
    };
}

function toHistory(delivery: SenderDeliveryListItem): RecentHistory {
    return {
        id: delivery.deliveryId,
        title: delivery.name ?? "이름 없는 물품",
        route: getRouteLabel(delivery),
        status: getDeliveryStatusLabel(delivery.status),
    };
}

function createSenderContent(
    name: string,
    deliveries: SenderDeliveryListItem[],
): HomeContent {
    const activeDeliveries = deliveries.filter(isSenderActiveDelivery);

    return {
        name,
        headline: "배송을 요청해보세요!",
        activeDeliveries: activeDeliveries.map(toSenderActiveDelivery),
        matchingRequests: [],
        recentHistories: deliveries
            .filter((delivery) => !isSenderActiveDelivery(delivery))
            .map(toHistory),
        actionLabel: "배송 요청하기",
    };
}

function isShipperActiveDelivery(delivery: ShipperDeliveryListItem) {
    return (
        delivery.deliveryState === "MATCHED" ||
        delivery.deliveryState === "DELIVERING" ||
        delivery.deliveryState === "CONFIRM_REQUESTED"
    );
}

function toShipperActiveDelivery(
    delivery: ShipperDeliveryListItem,
): ActiveDelivery {
    return {
        id: delivery.id,
        title: delivery.name ?? "이름 없는 물품",
        route: getRouteLabel(delivery),
        status: getDeliveryStatusLabel(delivery.deliveryState),
    };
}

function toMatchingRequest(delivery: ShipperDeliveryListItem): MatchingRequest {
    return {
        id: delivery.id,
        title: delivery.name ?? "이름 없는 물품",
        route: getRouteLabel(delivery),
        timeLeft:
            delivery.estimatedTimeMinutes != null
                ? `예상 ${delivery.estimatedTimeMinutes}분`
                : "매칭 요청",
    };
}

function createShipperContent(
    name: string,
    deliveries: ShipperDeliveryListItem[],
    requests: ShipperDeliveryListItem[],
): HomeContent {
    const activeDeliveries = deliveries.filter(isShipperActiveDelivery);

    return {
        name,
        headline: "배송을 시작해보세요!",
        activeDeliveries: activeDeliveries.map(toShipperActiveDelivery),
        matchingRequests: requests.map(toMatchingRequest),
        recentHistories: [],
    };
}

export default function HomePage() {
    const currentUser = getCurrentUser();
    const [userRole, setUserRole] = useState<UserRole>(
        () => getSelectedUserRole() ?? currentUser?.role ?? "shipper",
    );
    const loadProfile = useCallback(
        (role: UserRole) =>
            role === "sender"
                ? accountApi.getSenderMyPage()
                : accountApi.getShipperMyPage(),
        [],
    );
    const profileRequest = useApiRequest(loadProfile);
    const displayName =
        profileRequest.data?.nickname ||
        currentUser?.nickname ||
        currentUser?.name ||
        "패스로 사용자";
    const loadSenderDeliveries = useCallback(
        () => senderDeliveryApi.getDeliveryList(),
        [],
    );
    const loadShipperHomeData = useCallback(
        () =>
            Promise.all([
                shipperDeliveryApi.getMyDeliveries(),
                shipperDeliveryApi.getMatchRequests(),
            ]),
        [],
    );
    const senderRequest = useApiRequest(loadSenderDeliveries);
    const shipperRequest = useApiRequest(loadShipperHomeData);

    useEffect(() => {
        void profileRequest.execute(userRole).catch(() => undefined);

        if (userRole === "sender") {
            void senderRequest.execute().catch(() => undefined);
        } else {
            void shipperRequest.execute().catch(() => undefined);
        }
    }, [
        profileRequest.execute,
        senderRequest.execute,
        shipperRequest.execute,
        userRole,
    ]);

    const handleRoleChange = useCallback((nextRole: UserRole) => {
        setCurrentUserRole(nextRole);
        setUserRole(nextRole);
    }, []);

    const content = useMemo(
        () =>
            userRole === "sender"
                ? createSenderContent(displayName, senderRequest.data ?? [])
                : createShipperContent(
                      displayName,
                      shipperRequest.data?.[0] ?? [],
                      shipperRequest.data?.[1] ?? [],
                  ),
        [displayName, senderRequest.data, shipperRequest.data, userRole],
    );
    const activeRequest =
        userRole === "sender" ? senderRequest : shipperRequest;

    return (
        <HomeDashboard
            role={userRole}
            content={content}
            avatarUrl={profileRequest.data?.picture}
            isRoleChanging={activeRequest.isLoading}
            onRoleChange={handleRoleChange}
            isLoading={activeRequest.isLoading}
            errorMessage={
                activeRequest.error
                    ? activeRequest.error.message ||
                      "배송 목록을 불러오지 못했습니다."
                    : undefined
            }
            onRetry={() => void activeRequest.execute().catch(() => undefined)}
        />
    );
}
