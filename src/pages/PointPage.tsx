import { useState } from "react";
import ChevronIcon from "../assets/icons/ChevronIcon";
import { PointFilterButton } from "../components/points/PointFilterButton";
import { PointList } from "../components/points/PointList";
import { TotalPoint } from "../components/points/TotalPoint";
import { POINT_FILTER, PointFilter, PointFilterLabel } from "../types/point";
import { useNavigate } from "react-router-dom";

interface PointItem {
    id: number;
    name: string;
    date: string;
    amount: number;
    type: PointFilter;
}

const POINT_ITEMS: PointItem[] = [
    {
        id: 1,
        name: "코알라 티셔츠",
        date: "26.06.26",
        amount: 3000,
        type: "SAVING",
    },
    {
        id: 2,
        name: "프로그래밍 전공책",
        date: "26.06.20",
        amount: 1000,
        type: "SAVING",
    },
    {
        id: 3,
        name: "선러브 모자",
        date: "26.04.06",
        amount: 2000,
        type: "USE",
    },
    { id: 4, name: "오렌지", date: "26.04.01", amount: 1000, type: "EXPIRE" },
];

export default function PointPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<PointFilterLabel>("전체");

    const currentFilter: PointFilter | null =
        Object.values(POINT_FILTER).find((c) => c.label === selected)?.code ??
        null;

    const filteredItems =
        currentFilter === null
            ? POINT_ITEMS
            : POINT_ITEMS.filter((item) => item.type === currentFilter);

    const totalPoint = POINT_ITEMS.reduce(
        (sum, item) =>
            sum + (item.type === "SAVING" ? item.amount : -item.amount),
        0,
    );

    return (
        <div className="page-container">
            <div className="flex relative items-center justify-center text-gray-500">
                <div className="absolute left-0">
                    <button onClick={() => navigate("/mypage")}>
                        <ChevronIcon />
                    </button>
                </div>
                <div className="font-bold text-xl text-gray-900">포인트</div>
            </div>
            <TotalPoint total={totalPoint} />
            <PointFilterButton selected={selected} onSelect={setSelected} />
            <div className="my-5 font-bold text-gray-800">적립 내역</div>
            <PointList items={filteredItems} />
        </div>
    );
}
