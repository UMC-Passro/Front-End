import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export type InquiryCategory =
    | "DELAY"
    | "DAMAGE"
    | "LOST"
    | "WRONG_DELIVERY"
    | "POINT"
    | "ETC";

export interface CreateInquiryRequest {
    deliveryId: number;
    category: InquiryCategory;
    title?: string;
    content: string;
}

export interface Inquiry {
    inquiryId: number;
    deliveryId: number;
    category: InquiryCategory;
    title?: string;
    content: string;
    writerNickname?: string;
    createdAt: string;
}

export const inquiryApi = {
    create(request: CreateInquiryRequest) {
        return apiRequest<Inquiry>({
            method: "POST",
            url: API_ENDPOINTS.inquiry.root,
            data: request,
        });
    },

    getByDelivery(deliveryId: number) {
        return apiRequest<Inquiry[]>({
            method: "GET",
            url: API_ENDPOINTS.inquiry.byDelivery(deliveryId),
        });
    },
};
