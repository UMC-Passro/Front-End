import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface UpdateProfileRequest {
    nickname: string;
    phoneNumber: string;
    startPlaceId: number;
    destinationPlaceId: number;
    wayPoints?: number[];
}

export interface ChangePasswordRequest {
    password: string;
    code: string;
}

export interface SenderMyPage {
    picture: string | null;
    nickname: string;
    deliveryCount: number;
    point: number;
}

export interface ShipperMyPage extends SenderMyPage {
    rating: number;
}

export const accountApi = {
    getSenderMyPage() {
        return apiRequest<SenderMyPage>({
            method: "GET",
            url: API_ENDPOINTS.account.senderMyPage,
        });
    },

    getShipperMyPage() {
        return apiRequest<ShipperMyPage>({
            method: "GET",
            url: API_ENDPOINTS.account.shipperMyPage,
        });
    },

    updateProfile(request: UpdateProfileRequest) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.account.editMyInfo,
            data: request,
        });
    },

    sendPasswordEditMail() {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.account.sendPasswordEditMail,
        });
    },

    changePassword(request: ChangePasswordRequest) {
        return apiRequest<null>({
            method: "PATCH",
            url: API_ENDPOINTS.account.editPassword,
            data: request,
        });
    },
};
