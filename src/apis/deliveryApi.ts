import type {
    BackendDeliveryLogInfo,
    BackendDeliveryPartyInfo,
    BackendDeliveryState,
    BackendPlace,
} from "../types/backend";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateDeliveryRequest {
    sourceStationId: number;
    destinationStationId: number;
    name: string;
    price: number;
    size: "S" | "M" | "L";
    picture?: string;
    memo?: string;
}

export interface SenderDeliveryListItem {
    deliveryId: number;
    name: string | null;
    originPlace: BackendPlace;
    destPlace: BackendPlace;
    status: BackendDeliveryState;
    createdAt: string;
}

export interface SenderDeliveryDetail {
    id: number;
    name: string | null;
    originPlace: BackendPlace;
    destPlace: BackendPlace;
    status: BackendDeliveryState;
    shipperInfo: BackendDeliveryPartyInfo | null;
    deliveryTimeLine: BackendDeliveryLogInfo[];
}

export interface DeliveryStatusUpdateRequest {
    imageKey?: string;
}

export interface DeliveryPayment {
    id?: number | null;
    basePoint: number;
    distancePoint: number;
    weightPoint: number;
    totalPoint: number;
}

export interface DeliveryPaymentRequest {
    sourceStationId: number;
    destinationStationId: number;
    size: CreateDeliveryRequest["size"];
}

export const deliveryApi = {
    getSenderDeliveries() {
        return apiRequest<SenderDeliveryListItem[]>({
            method: "GET",
            url: API_ENDPOINTS.sender.root,
        });
    },

    getSenderDelivery(deliveryId: number) {
        return apiRequest<SenderDeliveryDetail>({
            method: "GET",
            url: API_ENDPOINTS.sender.detail(deliveryId),
        });
    },

    getPayment(request: DeliveryPaymentRequest) {
        return apiRequest<DeliveryPayment>({
            method: "GET",
            url: API_ENDPOINTS.sender.payment,
            params: request,
        });
    },

    create(request: CreateDeliveryRequest) {
        return apiRequest<string>({
            method: "POST",
            url: API_ENDPOINTS.sender.root,
            data: request,
        });
    },

    agreeTerms(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.terms(deliveryId),
        });
    },

    complete(
        deliveryId: number,
        request?: DeliveryStatusUpdateRequest,
    ) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.complete(deliveryId),
            data: request,
        });
    },

    cancel(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.cancel(deliveryId),
        });
    },
};
