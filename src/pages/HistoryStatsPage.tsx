import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { DeliveryFilterButton } from "../components/delivery/history/DeliveryFilterButton";
import { DeliveryList } from "../components/delivery/history/DeliveryList";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    DELIVERY_FILTER,
    DeliveryFilter,
    DeliveryFilterLabel,
    DeliveryStatus,
} from "../types/delivery/delivery";
import { shipperDeliveryApi } from "../apis";
import { useApiRequest } from "../hooks/useApiRequest";
import { ShipperDeliveryListItem } from "../types/delivery/shipper";
import { BackendDeliveryState } from "../types/backend";

interface DeliveryItem {
    id: number;
    name: string;
    start?: string;
    end?: string;
    date?: string;
    status: DeliveryStatus;
    role: UserRole;
}

function getDeliveryStatus(state: BackendDeliveryState): DeliveryStatus {
    switch (state) {
        case "WAIT":
        case "MATCHED":
            return "WAITING_PICKUP";
        case "DELIVERING":
        case "CONFIRM_REQUESTED":
            return "DELIVERING";
        case "DELIVERED":
        case "CANCEL":
            return "COMPLETED";
    }
}

function formatDeliveryDate(createdAt: string) {
    const date = new Date(createdAt);

    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

function toDeliveryItem(delivery: ShipperDeliveryListItem): DeliveryItem {
    return {
        id: delivery.id,
        name: delivery.name,
        start: delivery.originPlace.subwayStationName,
        end: delivery.destPlace.subwayStationName,
        date: formatDeliveryDate(delivery.createdAt),
        status: getDeliveryStatus(delivery.deliveryState),
    };
}

export function HistoryStatsPage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<DeliveryFilterLabel>("전체");
    const loadHistories = useCallback(
        () => shipperDeliveryApi.getDeliveryList(),
        [],
    );
    const deliveryRequest = useApiRequest(loadHistories);

    useEffect(() => {
        void deliveryRequest.execute().catch(() => undefined);
    }, [deliveryRequest.execute]);

    const deliveryItems = useMemo(
        () => (deliveryRequest.data ?? []).map(toDeliveryItem),
        [deliveryRequest.data],
    );

    const currentFilter: DeliveryFilter | null =
        Object.values(DELIVERY_FILTER).find((c) => c.label === selected)
            ?.code ?? null;

    const filteredItems =
        currentFilter === null
            ? deliveryItems
            : deliveryItems.filter((item) => item.status === currentFilter);

    return (
        <div className="page-container">
            <PageHeader title="활동 내역" onBack={() => navigate("/mypage")} />
            <div className="mt-8 flex items-center justify-between gap-3">
                <DeliveryFilterButton
                    selected={selected}
                    onSelect={setSelected}
                />
                <button
                    type="button"
                    role="switch"
                    aria-checked={isShipperFilter}
                    aria-label={`${isShipperFilter ? "전달" : "요청"} 내역만 표시 중`}
                    onClick={() =>
                        setRoleFilter(isShipperFilter ? "sender" : "shipper")
                    }
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-2 py-2 text-[11px] font-semibold text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                >
                    <span
                        className={`relative h-[22px] w-[42px] rounded-full transition-colors ${
                            isShipperFilter ? "bg-purple-600" : "bg-gray-400"
                        }`}
                        aria-hidden="true"
                    >
                        <span
                            className={`absolute top-0.5 h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform ${
                                isShipperFilter
                                    ? "translate-x-[0px]"
                                    : "translate-x-[-12px]"
                            }`}
                        />
                    </span>
                    <span>
                        {isShipperFilter ? "전달만 표시" : "요청만 표시"}
                    </span>
                </button>
            </div>
            <DeliveryList items={filteredItems} />
        </div>
    );
}
