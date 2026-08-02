import { ShipperDelivery } from "../../types/delivery/shipper";
import { apiRequest } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const shipperDeliveryApi = {
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
