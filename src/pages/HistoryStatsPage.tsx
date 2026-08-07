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
            <PageHeader title="배송 내역" onBack={() => navigate("/mypage")} />
            <DeliveryFilterButton selected={selected} onSelect={setSelected} />
            <DeliveryList items={filteredItems} />
        </div>
    );
}
