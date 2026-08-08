import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { DeliveryFilterButton } from "../components/delivery/history/DeliveryFilterButton";
import { DeliveryList } from "../components/delivery/history/DeliveryList";
import { useState } from "react";
import {
    DELIVERY_FILTER,
    DeliveryFilter,
    DeliveryFilterLabel,
    DeliveryStatus,
} from "../types/delivery/delivery";
import type { UserRole } from "../types/user";

interface DeliveryItem {
    id: number;
    name: string;
    start?: string;
    end?: string;
    date?: string;
    status: DeliveryStatus;
    role: UserRole;
}

const DELIVERY_ITEMS: DeliveryItem[] = [
    {
        id: 1,
        name: "무인양품 티셔츠",
        start: "안양",
        end: "정왕역",
        status: "DELIVERING",
        role: "shipper",
    },
    {
        id: 2,
        name: "코알라 티셔츠",
        date: "26.06.26",
        status: "COMPLETED",
        role: "sender",
    },
    {
        id: 3,
        name: "프로그래밍 전공책",
        date: "26.06.20",
        status: "COMPLETED",
        role: "shipper",
    },
    {
        id: 4,
        name: "선러브 모자",
        date: "26.04.06",
        status: "COMPLETED",
        role: "sender",
    },
    {
        id: 5,
        name: "오렌지",
        date: "26.04.01",
        status: "COMPLETED",
        role: "shipper",
    },
];

export function HistoryStatsPage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<DeliveryFilterLabel>("전체");
    const [roleFilter, setRoleFilter] = useState<UserRole>("shipper");
    const currentFilter: DeliveryFilter | null =
        Object.values(DELIVERY_FILTER).find((c) => c.label === selected)
            ?.code ?? null;
    const isShipperFilter = roleFilter === "shipper";
    const filteredItems = DELIVERY_ITEMS.filter(
        (item) =>
            item.role === roleFilter &&
            (currentFilter === null || item.status === currentFilter),
    );

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
                        className={`relative h-[22px] w-[42px] rounded-full transition-colors ${isShipperFilter ? "bg-purple-600" : "bg-gray-400"
                            }`}
                        aria-hidden="true"
                    >
                        <span
                            className={`absolute top-0.5 h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform ${isShipperFilter
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
