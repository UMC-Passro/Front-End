import { useNavigate } from "react-router-dom";
import ChevronIcon from "../assets/icons/ChevronIcon";
import { DeliveryFilterButton } from "../components/delivery/history/DeliveryFilterButton";
import { DeliveryList } from "../components/delivery/history/DeliveryList";
import { useState } from "react";
import {
    DELIVERY_FILTER,
    DeliveryFilter,
    DeliveryFilterLabel,
    DeliveryStatus,
} from "../types/delivery";

interface DeliveryItem {
    id: number;
    name: string;
    start?: string;
    end?: string;
    date?: string;
    status: DeliveryStatus;
}

const DELIVERY_ITEMS: DeliveryItem[] = [
    {
        id: 1,
        name: "무인양품 티셔츠",
        start: "안양",
        end: "정왕역",
        status: "DELIVERING",
    },
    {
        id: 2,
        name: "코알라 티셔츠",
        date: "26.06.26",
        status: "COMPLETED",
    },
    {
        id: 3,
        name: "프로그래밍 전공책",
        date: "26.06.20",
        status: "COMPLETED",
    },
    {
        id: 4,
        name: "선러브 모자",
        date: "26.04.06",
        status: "COMPLETED",
    },
    {
        id: 5,
        name: "오렌지",
        date: "26.04.01",
        status: "COMPLETED",
    },
];

export function HistoryStatsPage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<DeliveryFilterLabel>("전체");
    const currentFilter: DeliveryFilter | null =
        Object.values(DELIVERY_FILTER).find((c) => c.label === selected)
            ?.code ?? null;
    const filteredItems =
        currentFilter === null
            ? DELIVERY_ITEMS
            : DELIVERY_ITEMS.filter((item) => item.status === currentFilter);

    return (
        <div className="page-container">
            <div className="flex relative items-center justify-center text-gray-500">
                <div className="absolute left-0">
                    <button onClick={() => navigate("/mypage")}>
                        <ChevronIcon />
                    </button>
                </div>
                <div className="font-bold text-xl text-gray-900">배송 내역</div>
            </div>
            <DeliveryFilterButton selected={selected} onSelect={setSelected} />
            <DeliveryList items={filteredItems} />
        </div>
    );
}
