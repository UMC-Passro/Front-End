import type { BackendPlace } from "../types/backend";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface SendMailRequest {
    mail: string;
}

export interface ConfirmMailRequest {
    mail: string;
    code: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    nickname: string;
    place_id: BackendPlace;
    name: string;
    phone: string;
    birth: string;
    picture?: string;
}

export const authApi = {
    sendMail(request: SendMailRequest) {
        return apiRequest<null>({
            method: "POST",
            url: API_ENDPOINTS.auth.sendMail,
            data: request,
        });
    },

    confirmMail(request: ConfirmMailRequest) {
        return apiRequest<null>({
            method: "POST",
            url: API_ENDPOINTS.auth.confirmMail,
            data: request,
        });
    },

    signup(request: SignupRequest) {
        return apiRequest<null>({
            method: "POST",
            url: API_ENDPOINTS.auth.signup,
            data: request,
        });
    },
};
