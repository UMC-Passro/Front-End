import type {
    BackendDeliveryPartyInfo,
    BackendDeliveryLogType,
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
}

export interface SenderDeliveryDetail {
    id: number;
    name: string | null;
    status: BackendDeliveryState;
    shipperInfo: BackendDeliveryPartyInfo | null;
    deliveryTimeLine: Array<{
        id: number;
        type: BackendDeliveryLogType;
        image: string | null;
        createdAt: string;
    }>;
}

export interface DeliveryStatusUpdateRequest {
    imageKey?: string;
}

export interface DeliveryPayment {
    id: number;
    basePoint: number;
    distancePoint: number;
    weightPoint: number;
    totalPoint: number;
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

    getPayment(deliveryId: number) {
        return apiRequest<DeliveryPayment>({
            method: "GET",
            url: API_ENDPOINTS.sender.payment(deliveryId),
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
