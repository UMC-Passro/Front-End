import type { ReactNode } from "react";
import type { SubwayPathItem } from "../../apis/subwayApi";
import type { LocationTrackingStatus } from "../../hooks/useShipperRouteTracking";
import type {
    BackendDeliveryLogInfo,
    BackendDeliveryPartyInfo,
    BackendDeliveryState,
    BackendPlace,
} from "../../types/backend";
import {
    getDeliveryCompletedAt,
    getDeliveryRouteProgress,
} from "../../utils/deliveryTracking";
import type { GeographicCoordinates } from "../../utils/subwayLocation";
import { DeliveryPersonCard } from "./DeliveryPersonCard";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { DeliveryTrackingOverview } from "./DeliveryTrackingOverview";
import { SubwayRouteTracker } from "./SubwayRouteTracker";

interface DeliveryTrackingContentProps {
    itemName: string | null;
    status: BackendDeliveryState;
    originPlace: BackendPlace;
    destinationPlace: BackendPlace;
    logs: BackendDeliveryLogInfo[];
    route: SubwayPathItem | null;
    isRouteLoading: boolean;
    routeError?: string | null;
    currentPlaceId?: number;
    currentCoordinates?: GeographicCoordinates;
    currentDistanceMeters?: number;
    gpsAccuracyMeters?: number;
    trackingStatus: LocationTrackingStatus;
    trackingError?: string | null;
    lastLocationUpdatedAt?: string | null;
    estimatedTimeMinutes?: number | null;
    trackingStatusMessage?: string;
    partyTitle: string;
    party: BackendDeliveryPartyInfo | null;
    partyEmptyMessage: string;
    supplementaryContent?: ReactNode;
}

function formatPartyPlace(place: BackendPlace | null) {
    return place
        ? `${place.subwayStationName}(${place.subwayRouteName})`
        : null;
}

function RouteLoadingSkeleton() {
    return (
        <div
            className="h-[460px] animate-pulse rounded-3xl bg-gray-100"
            aria-label="지하철 경로를 불러오는 중"
            aria-busy="true"
        />
    );
}

export function DeliveryTrackingContent({
    itemName,
    status,
    originPlace,
    destinationPlace,
    logs,
    route,
    isRouteLoading,
    routeError,
    currentPlaceId,
    currentCoordinates,
    currentDistanceMeters,
    gpsAccuracyMeters,
    trackingStatus,
    trackingError,
    lastLocationUpdatedAt,
    estimatedTimeMinutes,
    trackingStatusMessage,
    partyTitle,
    party,
    partyEmptyMessage,
    supplementaryContent,
}: DeliveryTrackingContentProps) {
    const isCompleted = status === "DELIVERED";
    const routeProgress = getDeliveryRouteProgress(
        route?.stations ?? [],
        currentPlaceId,
        status,
    );
    const completedAt = getDeliveryCompletedAt(logs);
    const liveStationLabel =
        currentPlaceId !== undefined && routeProgress.currentStation
            ? `${routeProgress.currentStation.stationName} · ${routeProgress.currentStation.routeName}`
            : null;
    const partySection = (
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm">
            <h2 className="mb-3 text-base font-bold text-gray-900">
                {partyTitle}
            </h2>
            <DeliveryPersonCard
                name={party?.name ?? null}
                picture={party?.picture}
                place={formatPartyPlace(party?.place ?? null)}
                emptyMessage={partyEmptyMessage}
            />
        </section>
    );

    return (
        <>
            <DeliveryTrackingOverview
                itemName={itemName}
                status={status}
                originPlace={originPlace}
                destinationPlace={destinationPlace}
                routeProgress={routeProgress}
                completedAt={completedAt}
                lastLocationUpdatedAt={lastLocationUpdatedAt}
                estimatedTimeMinutes={estimatedTimeMinutes}
            />

            {isCompleted ? (
                <div className="mt-6 grid gap-6">
                    <DeliveryTimeline
                        status={status}
                        logs={logs}
                        originPlace={originPlace}
                        destinationPlace={destinationPlace}
                    />
                    {partySection}
                </div>
            ) : (
                <>
                    <div className="mt-6 grid gap-6">
                        <div>
                            {isRouteLoading ? (
                                <RouteLoadingSkeleton />
                            ) : route ? (
                                <SubwayRouteTracker
                                    stations={route.stations}
                                    currentPlaceId={currentPlaceId}
                                    currentCoordinates={currentCoordinates}
                                    currentDistanceMeters={
                                        currentDistanceMeters
                                    }
                                    gpsAccuracyMeters={gpsAccuracyMeters}
                                    trackingStatus={trackingStatus}
                                    trackingError={trackingError}
                                    transferCount={route.transferCount}
                                    lastUpdatedAt={lastLocationUpdatedAt}
                                    statusMessage={trackingStatusMessage}
                                />
                            ) : (
                                <p
                                    className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-sm font-medium text-rose-700"
                                    role="alert"
                                >
                                    {routeError ??
                                        "지하철 경로를 불러오지 못했습니다."}
                                </p>
                            )}
                        </div>

                        <aside className="flex flex-col gap-5">
                            {partySection}
                            {supplementaryContent}
                        </aside>
                    </div>

                    <div className="mt-6">
                        <DeliveryTimeline
                            status={status}
                            logs={logs}
                            originPlace={originPlace}
                            destinationPlace={destinationPlace}
                            currentStationLabel={liveStationLabel}
                        />
                    </div>
                </>
            )}
        </>
    );
}
