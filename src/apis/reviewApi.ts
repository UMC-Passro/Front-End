import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateReviewRequest {
    deliveryId: number;
    rating: number;
    content?: string;
}

export interface ReviewAverage {
    averageRating: number;
}

export const reviewApi = {
    create(request: CreateReviewRequest) {
        return apiRequest<string>({
            method: "POST",
            url: API_ENDPOINTS.review.root,
            data: request,
        });
    },

    getAverage(userId: number) {
        return apiRequest<ReviewAverage>({
            method: "GET",
            url: API_ENDPOINTS.review.average(userId),
        });
    },
};
