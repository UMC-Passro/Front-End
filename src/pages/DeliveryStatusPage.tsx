import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deliveryApi } from "../apis/deliveryApi";
import { inquiryApi } from "../apis/inquiryApi";
import { subwayApi, type SubwayPathItem } from "../apis/subwayApi";
import PageHeader from "../components/common/PageHeader";
import { DeliveryCancelSheet } from "../components/delivery/DeliveryCancelSheet";
import { DeliveryTrackingContent } from "../components/delivery/DeliveryTrackingContent";
import { MissingDeliveryReportSheet } from "../components/delivery/MissingDeliveryReportSheet";
import { useApiRequest } from "../hooks/useApiRequest";
import { useSenderRouteTracking } from "../hooks/useSenderRouteTracking";
import { ApiError } from "../types/api";
import type { BackendDeliveryState } from "../types/backend";

function getSenderTrackingMessage(status: BackendDeliveryState) {
    switch (status) {
        case "WAIT":
            return "배송자가 매칭되면 경로 추적을 시작할 수 있습니다.";
        case "MATCHED":
            return "배송자가 물품을 인수하면 위치 추적이 시작됩니다.";
        case "DELIVERING":
            return "배송자의 위치를 15초마다 갱신하고 있습니다.";
        case "CONFIRM_REQUESTED":
            return "전달 완료 확인을 기다리고 있습니다.";
        case "DELIVERED":
            return "배송이 최종 완료되었습니다.";
        case "CANCEL":
            return "취소된 배송입니다.";
    }
}

export default function DeliveryStatusPage() {
    const navigate = useNavigate();
    const { deliveryId: deliveryIdParam } = useParams<{
        deliveryId: string;
    }>();
    const deliveryId = Number(deliveryIdParam);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [isReportSubmitted, setIsReportSubmitted] = useState(false);
    const [actionError, setActionError] = useState("");
    const [cancelError, setCancelError] = useState("");
    const [reportError, setReportError] = useState("");
    const [route, setRoute] = useState<SubwayPathItem | null>(null);
    const [isRouteLoading, setIsRouteLoading] = useState(false);
    const [routeError, setRouteError] = useState<string | null>(null);
    const loadDelivery = useCallback(() => {
        if (!Number.isSafeInteger(deliveryId) || deliveryId <= 0) {
            return Promise.reject(
                new ApiError({ message: "올바르지 않은 배송 ID입니다." }),
            );
        }

        return deliveryApi.getSenderDelivery(deliveryId);
    }, [deliveryId]);
    const { data, error, isLoading, execute } = useApiRequest(loadDelivery);
    const senderTracking = useSenderRouteTracking({
        deliveryId,
        enabled: data?.status === "DELIVERING",
        stations: route?.stations ?? [],
    });

    useEffect(() => {
        void execute().catch(() => undefined);
    }, [execute]);

    useEffect(() => {
        if (!data) {
            return;
        }

        if (data.status === "DELIVERED") {
            setRoute(null);
            setRouteError(null);
            setIsRouteLoading(false);
            return;
        }

        let isActive = true;
        setIsRouteLoading(true);
        setRouteError(null);

        void subwayApi
            .path({
                originPlaceId: data.originPlace.id,
                destinationPlaceId: data.destPlace.id,
                waypointPlaceIds: [],
            })
            .then((nextRoute) => {
                if (isActive) {
                    setRoute(nextRoute);
                }
            })
            .catch((caughtError: unknown) => {
                if (isActive) {
                    setRoute(null);
                    setRouteError(
                        caughtError instanceof Error
                            ? caughtError.message
                            : "지하철 경로를 불러오지 못했습니다.",
                    );
                }
            })
            .finally(() => {
                if (isActive) {
                    setIsRouteLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [data?.destPlace.id, data?.originPlace.id, data?.status]);

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

    const handleCancel = async () => {
        if (!data || data.status !== "WAIT" || isCanceling) {
            return;
        }

        setIsCanceling(true);
        setCancelError("");

        try {
            await deliveryApi.cancel(deliveryId);
            setIsCancelOpen(false);
            navigate("/home", { replace: true });
        } catch (caughtError) {
            setCancelError(
                caughtError instanceof ApiError
                    ? caughtError.message
                    : "배송 요청을 취소하지 못했습니다. 다시 시도해주세요.",
            );
        } finally {
            setIsCanceling(false);
        }
    };

    const handleMissingDeliveryReport = async (content: string) => {
        if (
            !data ||
            data.status !== "CONFIRM_REQUESTED" ||
            isReporting ||
            !content
        ) {
            return;
        }

        setIsReporting(true);
        setReportError("");

        try {
            await inquiryApi.createDelivery({
                deliveryId,
                category: "LOST",
                title: "물품 미도착 신고",
                content,
            });
            setIsReportSubmitted(true);
            setIsReportOpen(false);
        } catch (caughtError) {
            setReportError(
                caughtError instanceof ApiError
                    ? caughtError.message
                    : "미도착 신고를 접수하지 못했습니다. 다시 시도해주세요.",
            );
        } finally {
            setIsReporting(false);
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
                <div
                    className="flex flex-1 flex-col gap-5 pt-8"
                    aria-busy="true"
                >
                    <div className="h-52 animate-pulse rounded-3xl bg-gray-100" />
                    <div className="h-96 animate-pulse rounded-3xl bg-gray-100" />
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
                        className="w-full rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center"
                        role="alert"
                    >
                        <p className="text-sm font-medium text-rose-700">
                            {error?.message ??
                                "배송 정보를 불러오지 못했습니다."}
                        </p>
                        <button
                            type="button"
                            onClick={() =>
                                void execute().catch(() => undefined)
                            }
                            className="mt-4 text-sm font-bold text-rose-700 underline"
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const canCancel = data.status === "WAIT";
    const canComplete = data.status === "CONFIRM_REQUESTED";

    return (
        <>
            <div className="page-container relative flex flex-col overflow-hidden">
                <PageHeader
                    title="배송 추적"
                    onBack={() => navigate(-1)}
                    className="shrink-0"
                />

                <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                    <DeliveryTrackingContent
                        itemName={data.name}
                        status={data.status}
                        originPlace={data.originPlace}
                        destinationPlace={data.destPlace}
                        logs={data.deliveryTimeLine}
                        route={route}
                        isRouteLoading={isRouteLoading}
                        routeError={routeError}
                        currentPlaceId={senderTracking.location?.placeId}
                        currentCoordinates={
                            senderTracking.location ?? undefined
                        }
                        currentDistanceMeters={
                            senderTracking.nearestStation?.distanceMeters
                        }
                        trackingStatus={senderTracking.status}
                        trackingError={senderTracking.errorMessage}
                        lastLocationUpdatedAt={
                            senderTracking.location?.updatedAt
                        }
                        estimatedTimeMinutes={
                            senderTracking.location?.estimatedTimeMinutes
                        }
                        trackingStatusMessage={getSenderTrackingMessage(
                            data.status,
                        )}
                        partyTitle="전달자 정보"
                        party={data.shipperInfo}
                        partyEmptyMessage="아직 배송자가 매칭되지 않았습니다."
                    />
                </div>

                {canCancel || canComplete ? (
                    <div className="shrink-0 border-t border-gray-100 bg-white pt-3">
                        {actionError ? (
                            <p
                                className="mb-2 text-center text-xs font-medium text-rose-600"
                                role="alert"
                            >
                                {actionError}
                            </p>
                        ) : null}
                        {isReportSubmitted ? (
                            <p
                                className="mb-2 rounded-lg bg-rose-50 px-3 py-2 text-center text-xs font-semibold text-rose-700"
                                role="status"
                            >
                                물품 미도착 신고가 접수되었습니다.
                            </p>
                        ) : null}
                        {canCancel ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setCancelError("");
                                    setIsCancelOpen(true);
                                }}
                                className="w-full rounded-xl border border-rose-200 bg-white py-3.5 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                            >
                                배송 요청 취소
                            </button>
                        ) : null}
                        {canComplete ? (
                            <div className="grid grid-cols-2 gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReportError("");
                                        setIsReportOpen(true);
                                    }}
                                    disabled={isReportSubmitted}
                                    className="rounded-xl border border-rose-200 bg-white px-2 py-3.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:border-gray-200 disabled:text-gray-400"
                                >
                                    {isReportSubmitted
                                        ? "미도착 신고 접수됨"
                                        : "물건을 받지 못했어요"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleComplete}
                                    disabled={isCompleting}
                                    className="rounded-xl bg-purple-600 px-2 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                >
                                    {isCompleting
                                        ? "완료 처리 중..."
                                        : "배송 완료 승인"}
                                </button>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>

            {isCancelOpen ? (
                <DeliveryCancelSheet
                    isSubmitting={isCanceling}
                    errorMessage={cancelError}
                    onClose={() => setIsCancelOpen(false)}
                    onConfirm={() => void handleCancel()}
                />
            ) : null}

            {isReportOpen ? (
                <MissingDeliveryReportSheet
                    isSubmitting={isReporting}
                    errorMessage={reportError}
                    onClose={() => setIsReportOpen(false)}
                    onSubmit={(content) =>
                        void handleMissingDeliveryReport(content)
                    }
                />
            ) : null}
        </>
    );
}
