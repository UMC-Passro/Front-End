import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export type ReportReason =
    | "SPAM"
    | "ABUSE"
    | "FRAUD"
    | "HARASSMENT"
    | "INAPPROPRIATE_CONTENT"
    | "OTHER";

export interface CreateDeliveryReportRequest {
    targetType: "DELIVERY";
    reason: ReportReason;
    detail: string;
    deliveryId: number;
}

export interface CreateReportResponse {
    reportId: number;
    status: "PENDING" | "IN_REVIEW" | "RESOLVED" | "REJECTED";
}

export const reportApi = {
    createDeliveryReport(request: CreateDeliveryReportRequest) {
        return apiRequest<CreateReportResponse>({
            method: "POST",
            url: API_ENDPOINTS.report.root,
            data: request,
        });
    },
};
