import {
    BackendDeliveryLogInfo,
    BackendDeliveryPartyInfo,
    BackendDeliveryState,
    BackendPlace,
} from "../../types/backend";
import { apiRequest } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export interface ShipperDeliveryListItem {
    id: number;
    name: string | null;
    senderInfo: BackendDeliveryPartyInfo | null;
    shipperInfo: BackendDeliveryPartyInfo | null;
    originPlace: BackendPlace;
    destPlace: BackendPlace;
    deliveryState: BackendDeliveryState;
    memo: string | null;
    createdAt: string;
    estimatedTimeMinutes: number | null;
}

export interface ShipperDeliveryDetail {
    id: number;
    name: string | null;
    senderInfo: BackendDeliveryPartyInfo | null;
    shipperInfo: BackendDeliveryPartyInfo | null;
    originPlace: BackendPlace;
    destPlace: BackendPlace;
    deliveryState: BackendDeliveryState;
    memo: string | null;
    deliveryTimeLine: BackendDeliveryLogInfo[];
}

export interface DeliveryStatusUpdateRequest {
    imageKey?: string;
}

export const shipperDeliveryApi = {
    getMatchRequests() {
        return apiRequest<ShipperDeliveryListItem[]>({
            method: "GET",
            url: API_ENDPOINTS.shipper.matched,
        });
    },

    getMyDeliveries() {
        return apiRequest<ShipperDeliveryListItem[]>({
            method: "GET",
            url: API_ENDPOINTS.shipper.root,
        });
    },

    getDelivery(deliveryId: number) {
        return apiRequest<ShipperDeliveryDetail>({
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

    acquire(deliveryId: number, request?: DeliveryStatusUpdateRequest) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.shipper.acquire(deliveryId),
            data: request,
        });
    },

    requestConfirmation(
        deliveryId: number,
        request?: DeliveryStatusUpdateRequest,
    ) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.shipper.confirm(deliveryId),
            data: request,
        });
    },
};
