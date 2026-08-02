import { useCallback, useEffect, useMemo } from "react";
import { deliveryApi, type SenderDeliveryListItem } from "../apis/deliveryApi";
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

const shipperActiveDelivery: ActiveDelivery = {
    id: 1,
    title: "무인양품 티셔츠",
    route: "안양 → 정왕역",
    status: "배송중",
};

const matchingRequests: MatchingRequest[] = [
    {
        id: 1,
        title: "전공 페이퍼",
        route: "안양 → 정왕역",
        timeLeft: "10분",
    },
    {
        id: 2,
        title: "오렌지 한 박스",
        route: "안양 → 정왕역",
        timeLeft: "8분",
    },
];

function getPlaceLabel(delivery: SenderDeliveryListItem, key: "originPlace" | "destPlace") {
    const place = delivery[key];
    return `${place.subwayStationName}(${place.subwayRouteName})`;
}

function getRouteLabel(delivery: SenderDeliveryListItem) {
    return `${getPlaceLabel(delivery, "originPlace")} → ${getPlaceLabel(delivery, "destPlace")}`;
}

function isActiveDelivery(delivery: SenderDeliveryListItem) {
    return delivery.status !== "DELIVERED" && delivery.status !== "CANCEL";
}

function toActiveDelivery(
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
    const active = deliveries.find(isActiveDelivery) ?? null;

    return {
        name,
        headline: "배송을 요청해보세요!",
        activeDelivery: active ? toActiveDelivery(active) : null,
        matchingRequests: [],
        recentHistories: deliveries
            .filter((delivery) => delivery.deliveryId !== active?.deliveryId)
            .map(toHistory),
        actionLabel: "배송 요청하기",
    };
}

function createShipperContent(name: string): HomeContent {
    return {
        name,
        headline: "배송을 시작해보세요!",
        activeDelivery: shipperActiveDelivery,
        matchingRequests,
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
    const {
        data: senderDeliveries,
        error,
        isLoading,
        execute,
    } = useApiRequest(loadSenderDeliveries);

    useEffect(() => {
        if (userRole === "sender") {
            void execute().catch(() => undefined);
        }
    }, [execute, userRole]);

    const content = useMemo(
        () =>
            userRole === "sender"
                ? createSenderContent(displayName, senderDeliveries ?? [])
                : createShipperContent(displayName),
        [displayName, senderDeliveries, userRole],
    );

    return (
        <HomeDashboard
            role={userRole}
            content={content}
            isLoading={userRole === "sender" && isLoading}
            errorMessage={
                userRole === "sender" && error
                    ? error.message || "배송 목록을 불러오지 못했습니다."
                    : undefined
            }
            onRetry={
                userRole === "sender"
                    ? () => void execute().catch(() => undefined)
                    : undefined
            }
        />
    );
}
