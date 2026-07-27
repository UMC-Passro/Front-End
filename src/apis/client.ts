import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";
import { ApiError, type ApiErrorBody, type ApiResponse } from "../types/api";
import { tokenStorage } from "./tokenStorage";

const DEFAULT_API_BASE_URL = "http://localhost:8080";
const DEFAULT_TIMEOUT_MS = 10_000;

function getTimeout() {
    const configuredTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS);
    return Number.isFinite(configuredTimeout) && configuredTimeout > 0
        ? configuredTimeout
        : DEFAULT_TIMEOUT_MS;
}

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
    timeout: getTimeout(),
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = tokenStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
);

function isApiErrorBody(value: unknown): value is ApiErrorBody {
    return typeof value === "object" && value !== null;
}

function normalizeError(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error;
    }

    if (error instanceof AxiosError) {
        const responseBody = isApiErrorBody(error.response?.data)
            ? error.response.data
            : undefined;

        return new ApiError({
            message:
                responseBody?.message ??
                error.message ??
                "API 요청 중 오류가 발생했습니다.",
            status: error.response?.status,
            code: responseBody?.code,
            details: responseBody?.result,
        });
    }

    return new ApiError({
        message:
            error instanceof Error
                ? error.message
                : "알 수 없는 오류가 발생했습니다.",
    });
}

function unwrapResponse<T>(body: ApiResponse<T>): T {
    const succeeded = body.success ?? body.isSuccess;

    if (succeeded === false) {
        throw new ApiError({
            message: body.message,
            code: body.code,
            details: body.result,
        });
    }

    return body.result;
}

export async function apiRequest<T>(
    config: AxiosRequestConfig,
): Promise<T> {
    try {
        const response = await apiClient.request<ApiResponse<T>>(config);
        return unwrapResponse(response.data);
    } catch (error) {
        throw normalizeError(error);
    }
}
