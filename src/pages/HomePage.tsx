import { useCallback, useEffect, useMemo } from "react";
import {
    deliveryApi,
    type SenderDeliveryListItem,
} from "../apis/deliveryApi";
import {
    matchingApi,
    type ShipperDeliveryListItem,
} from "../apis/matchingApi";
import { HomeDashboard } from "../components/home/HomeDashboard";
import { useApiRequest } from "../hooks/useApiRequest";
import type {
    ActiveDelivery,
    HomeContent,
    MatchingRequest,
    RecentHistory,
} from "../types/home";
import type { UserRole } from "../types/user";
import { getCurrentUser, getSelectedUserRole } from "../utils/auth";
import { getDeliveryStatusLabel } from "../utils/deliveryStatus";

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

function toMatchingRequest(
    delivery: ShipperDeliveryListItem,
): MatchingRequest {
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
    const userRole: UserRole =
        getSelectedUserRole() ?? currentUser?.role ?? "shipper";
    const displayName =
        currentUser?.nickname || currentUser?.name || "패스로 사용자";
    const loadSenderDeliveries = useCallback(
        () => deliveryApi.getSenderDeliveries(),
        [],
    );
    const loadShipperHomeData = useCallback(
        () =>
            Promise.all([
                matchingApi.getMyDeliveries(),
                matchingApi.getMatchRequests(),
            ]),
        [],
    );
    const senderRequest = useApiRequest(loadSenderDeliveries);
    const shipperRequest = useApiRequest(loadShipperHomeData);

    useEffect(() => {
        if (userRole === "sender") {
            void senderRequest.execute().catch(() => undefined);
        } else {
            void shipperRequest.execute().catch(() => undefined);
        }
    }, [senderRequest.execute, shipperRequest.execute, userRole]);

    const content = useMemo(
        () =>
            userRole === "sender"
                ? createSenderContent(
                      displayName,
                      senderRequest.data ?? [],
                  )
                : createShipperContent(
                      displayName,
                      shipperRequest.data?.[0] ?? [],
                      shipperRequest.data?.[1] ?? [],
                  ),
        [
            displayName,
            senderRequest.data,
            shipperRequest.data,
            userRole,
        ],
    );
    const activeRequest =
        userRole === "sender" ? senderRequest : shipperRequest;

    return (
        <HomeDashboard
            role={userRole}
            content={content}
            isLoading={activeRequest.isLoading}
            errorMessage={
                activeRequest.error
                    ? activeRequest.error.message ||
                      "배송 목록을 불러오지 못했습니다."
                    : undefined
            }
            onRetry={() =>
                void activeRequest.execute().catch(() => undefined)
            }
        />
    );
}
