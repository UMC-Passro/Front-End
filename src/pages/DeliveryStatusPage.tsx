import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deliveryApi } from "../apis/deliveryApi";
import PageHeader from "../components/common/PageHeader";
import { DeliveryPersonCard } from "../components/delivery/DeliveryPersonCard";
import { DeliveryProgress } from "../components/delivery/DeliveryProgress";
import { useApiRequest } from "../hooks/useApiRequest";
import type { BackendDeliveryLogType, BackendPlace } from "../types/backend";
import { ApiError } from "../types/api";
import {
    getDeliveryStatusLabel,
    toDeliveryViewStatus,
} from "../utils/deliveryStatus";

const TIMELINE_LABELS: Record<BackendDeliveryLogType, string> = {
    SEND_REQUEST: "배송 요청",
    MATCHED: "배송자 매칭",
    PICKED_UP: "물품 픽업",
    DELIVERED: "전달 완료 요청",
    DONE: "배송 완료",
    CANCELED: "배송 취소",
};

function formatTimelineDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
}

function getPlaceLabel(place: BackendPlace | null) {
    if (!place) {
        return null;
    }

    return `${place.subwayStationName}(${place.subwayRouteName})`;
}

function getActionLabel(status: string) {
    switch (status) {
        case "WAIT":
            return "매칭 대기 중";
        case "MATCHED":
            return "물품 픽업 대기";
        case "DELIVERING":
            return "배송 중";
        case "CONFIRM_REQUESTED":
            return "완료 확인";
        case "DELIVERED":
            return "배송 완료";
        case "CANCEL":
            return "취소된 배송";
        default:
            return "현재 상태 확인";
    }
}

export default function DeliveryStatusPage() {
    const navigate = useNavigate();
    const { deliveryId: deliveryIdParam } = useParams<{
        deliveryId: string;
    }>();
    const deliveryId = Number(deliveryIdParam);
    const [isCompleting, setIsCompleting] = useState(false);
    const [actionError, setActionError] = useState("");
    const loadDelivery = useCallback(() => {
        if (!Number.isSafeInteger(deliveryId) || deliveryId <= 0) {
            return Promise.reject(
                new ApiError({ message: "올바르지 않은 배송 ID입니다." }),
            );
        }

        return deliveryApi.getSenderDelivery(deliveryId);
    }, [deliveryId]);
    const { data, error, isLoading, execute } = useApiRequest(loadDelivery);

    useEffect(() => {
        void execute().catch(() => undefined);
    }, [execute]);

    const handleComplete = async () => {
        if (!data || data.status !== "CONFIRM_REQUESTED" || isCompleting) {
            return;
        }

        setIsCompleting(true);
        setActionError("");

        try {
            await deliveryApi.complete(deliveryId);
            await execute();
        } catch (caughtError) {
            setActionError(
                caughtError instanceof ApiError
                    ? caughtError.message
                    : "배송 완료 처리에 실패했습니다. 다시 시도해주세요.",
            );
        } finally {
            setIsCompleting(false);
        }
    };

    if (isLoading || (!data && !error)) {
        return (
            <div className="page-container flex h-full min-h-0 flex-col overflow-hidden">
                <PageHeader
                    title="배송 추적"
                    onBack={() => navigate(-1)}
                    className="shrink-0"
                />
                <div className="flex flex-1 flex-col gap-5 pt-10" aria-busy="true">
                    <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="page-container flex h-full min-h-0 flex-col overflow-hidden">
                <PageHeader
                    title="배송 추적"
                    onBack={() => navigate(-1)}
                    className="shrink-0"
                />
                <div className="flex flex-1 items-center justify-center">
                    <div
                        className="w-full rounded-xl border border-rose-200 bg-rose-50 p-5 text-center"
                        role="alert"
                    >
                        <p className="text-sm font-medium text-rose-700">
                            {error?.message ??
                                "배송 정보를 불러오지 못했습니다."}
                        </p>
                        <button
                            type="button"
                            onClick={() => void execute().catch(() => undefined)}
                            className="mt-4 text-sm font-bold text-rose-700 underline"
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const viewStatus = toDeliveryViewStatus(data.status);
    const shipper = data.shipperInfo;
    const canComplete = data.status === "CONFIRM_REQUESTED";

    return (
        <div className="page-container relative flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="배송 추적"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />
            <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                <section className="mt-7 rounded-xl bg-gray-50 px-5 py-4">
                    <h1 className="truncate text-lg font-bold text-gray-900">
                        {data.name ?? "이름 없는 물품"}
                    </h1>
                    <p className="mt-1 text-sm font-semibold text-purple-600">
                        {getDeliveryStatusLabel(data.status)}
                    </p>
                </section>

                {viewStatus ? (
                    <DeliveryProgress status={viewStatus} />
                ) : (
                    <p className="mt-8 rounded-xl bg-gray-50 px-5 py-5 text-center text-sm font-medium text-gray-500">
                        취소된 배송입니다.
                    </p>
                )}

                <section className="mt-8 flex flex-col gap-3">
                    <h2 className="font-bold text-gray-900">전달자 정보</h2>
                    <DeliveryPersonCard
                        name={shipper?.name ?? null}
                        picture={shipper?.picture}
                        place={getPlaceLabel(shipper?.place ?? null)}
                        emptyMessage="아직 배송자가 매칭되지 않았습니다."
                    />
                </section>

                <section className="mt-12">
                    <h2 className="text-[17px] font-bold">전달 타임라인</h2>

                    {data.deliveryTimeLine.length === 0 ? (
                        <p className="mt-5 rounded-xl bg-gray-50 px-5 py-5 text-center text-sm font-medium text-gray-500">
                            배송 진행 내역이 없습니다.
                        </p>
                    ) : (
                        <ol className="relative ml-[18px] mt-[23px] flex flex-col gap-[23px]">
                            <span
                                className="absolute bottom-[11px] left-[4.5px] top-[11px] border border-dashed border-gray-100"
                                aria-hidden="true"
                            />

                            {data.deliveryTimeLine.map((item) => (
                                <li
                                    key={item.id}
                                    className="relative flex items-center"
                                >
                                    <span className="relative z-10 mr-[15px] h-2.5 w-2.5 shrink-0 rounded-full bg-purple-500" />
                                    <span className="mr-7 min-w-0 flex-1 text-[15px] font-semibold">
                                        {TIMELINE_LABELS[item.type]}
                                    </span>
                                    <time className="shrink-0 text-xs font-semibold text-gray-500">
                                        {formatTimelineDate(item.createdAt)}
                                    </time>
                                </li>
                            ))}
                        </ol>
                    )}
                </section>
            </div>

            <div className="shrink-0 pt-3">
                {actionError ? (
                    <p
                        className="mb-2 text-center text-xs font-medium text-rose-600"
                        role="alert"
                    >
                        {actionError}
                    </p>
                ) : null}
                <button
                    type="button"
                    onClick={handleComplete}
                    disabled={!canComplete || isCompleting}
                    className="w-full rounded-lg bg-purple-500 py-3.5 font-semibold text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                >
                    {isCompleting
                        ? "완료 처리 중..."
                        : getActionLabel(data.status)}
                </button>
            </div>
        </div>
    );
}
