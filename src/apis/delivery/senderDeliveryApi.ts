import {
    BackendDeliveryLogInfo,
    BackendDeliveryPartyInfo,
    BackendDeliveryState,
    BackendPlace,
} from "../../types/backend";
import { apiRequest } from "../client";
import { API_ENDPOINTS } from "../endpoints";

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

export const senderDeliveryApi = {
    getSenderDeliveries() {
        return apiRequest<SenderDeliveryListItem[]>({
            method: "GET",
            url: API_ENDPOINTS.sender.root,
        });
    },

    getDeliveryItem(deliveryId: number) {
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

    complete(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.complete(deliveryId),
        });
    },

    cancel(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.cancel(deliveryId),
        });
    },

    location(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.sender.location(deliveryId),
        });
    },
};
