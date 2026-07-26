import type {
    BackendAccountSummary,
    BackendDeliveryState,
    BackendPlace,
} from "../types/backend";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface ShipperDelivery {
    id: number;
    senderAccount: BackendAccountSummary;
    shipperAccount: BackendAccountSummary | null;
    originPlace: BackendPlace | null;
    destPlace: BackendPlace | null;
    deliveryState: BackendDeliveryState;
    memo?: string;
}

export const matchingApi = {
    getMatchRequests() {
        return apiRequest<ShipperDelivery[]>({
            method: "GET",
            url: API_ENDPOINTS.shipper.matched,
        });
    },

    getMyDeliveries() {
        return apiRequest<ShipperDelivery[]>({
            method: "GET",
            url: API_ENDPOINTS.shipper.root,
        });
    },

    getDelivery(deliveryId: number) {
        return apiRequest<ShipperDelivery>({
            method: "GET",
            url: API_ENDPOINTS.shipper.detail(deliveryId),
        });
    },

    accept(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.shipper.acceptMatch(deliveryId),
        });
    },

    acquire(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.shipper.acquire(deliveryId),
        });
    },

    requestConfirmation(deliveryId: number) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.shipper.confirm(deliveryId),
        });
    },
};
