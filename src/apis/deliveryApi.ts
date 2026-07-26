import type {
    BackendDeliveryLogType,
    BackendDeliveryState,
    BackendPlace,
} from "../types/backend";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateDeliveryRequest {
    originAddress: string;
    destAddress: string;
    name: string;
    price: number;
    size: "S" | "M" | "L" | string;
    picture?: string;
    memo?: string;
}

export interface SenderDeliveryListItem {
    deliveryId: number;
    goodName: string;
    originAddress: string;
    destAddress: string;
    status: BackendDeliveryState;
}

export interface SenderDeliveryDetail {
    id: number;
    status: BackendDeliveryState;
    shipperInfo: {
        name?: string;
        picture?: string;
        place?: BackendPlace | null;
    } | null;
    deliveryTimeLine: Array<{
        id: number;
        type: BackendDeliveryLogType;
        createdAt: string;
    }>;
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
};
