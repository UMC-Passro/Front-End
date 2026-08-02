import type { BackendDeliveryState, BackendPlace } from "../types/backend";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export type PointIncrementReason =
    | "DELIVERY_PAYMENT"
    | "DELIVERY_REFUND"
    | "DELIVERY_SETTLEMENT";

export interface PointDelivery {
    id: number;
    name: string | null;
    origin: BackendPlace | null;
    destination: BackendPlace | null;
    status: BackendDeliveryState;
    memo: string | null;
}

export interface PointLog {
    pointLogId: number;
    delivery: PointDelivery;
    incrementReason: PointIncrementReason;
    deltaPoint: number;
    beforePoint: number;
    afterPoint: number;
    incrementReasonMemo: string | null;
    createdAt: string;
}

export interface PointHistory {
    currentPoint: number;
    pointLogs: PointLog[];
}

export const pointApi = {
    getHistory() {
        return apiRequest<PointHistory>({
            method: "GET",
            url: API_ENDPOINTS.account.points,
        });
    },
};
