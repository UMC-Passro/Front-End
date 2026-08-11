import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { PointFilterButton } from "../components/points/PointFilterButton";
import { PointList } from "../components/points/PointList";
import { TotalPoint } from "../components/points/TotalPoint";
import {
    POINT_FILTER,
    PointFilter,
    PointFilterLabel,
    PointIncrementReason,
    PointLog,
} from "../types/point";
import { useNavigate } from "react-router-dom";
import { pointApi } from "../apis";
import { useApiRequest } from "../hooks/useApiRequest";

export default function PointPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<PointFilterLabel>("전체");

    const loadPoint = useCallback(() => pointApi.getHistory(), []);

    const pointRequest = useApiRequest(loadPoint);

    useEffect(() => {
        void pointRequest.execute().catch(() => undefined);
    }, [pointRequest.execute]);

    const pointItems = useMemo(() => {
        return (pointRequest.data?.pointLogs ?? []).map((log) => ({
            id: log.pointLogId,
            name: getPointLogName(log),
            date: formatPointDate(log.createdAt),
            amount: Math.abs(log.deltaPoint),
            type: getPointFilterType(log.incrementReason),
        }));
    }, [pointRequest.data]);

    const currentFilter: PointFilter | null =
        Object.values(POINT_FILTER).find((c) => c.label === selected)?.code ??
        null;

    const filteredItems =
        currentFilter === null
            ? pointItems
            : pointItems.filter((item) => item.type === currentFilter);

    const totalPoint = pointRequest.data?.currentPoint ?? 0;

    return (
        <div className="page-container">
            <PageHeader title="포인트" onBack={() => navigate("/mypage")} />
            <TotalPoint total={totalPoint} />
            <PointFilterButton selected={selected} onSelect={setSelected} />
            <div className="my-5 font-bold text-gray-800">적립 내역</div>
            <PointList items={filteredItems} />
        </div>
    );
}

function getPointLogName(log: PointLog) {
    return (
        log.delivery?.name?.trim() ||
        log.market?.name?.trim() ||
        log.incrementReasonMemo?.trim() ||
        "포인트 내역"
    );
}

function formatPointDate(createdAt: string) {
    const date = new Date(createdAt);

    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

function getPointFilterType(reason: PointIncrementReason): PointFilter {
    switch (reason) {
        case "DELIVERY_REFUND":
        case "DELIVERY_SETTLEMENT":
            return "SAVING";
        case "DELIVERY_PAYMENT":
        case "MARKET_PURCHASE":
            return "USE";
    }
}
