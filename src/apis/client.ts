import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";
import { ApiError, type ApiErrorBody, type ApiResponse } from "../types/api";
import type { TokenResponse } from "./authApi";
import { API_ENDPOINTS } from "./endpoints";
import { tokenStorage } from "./tokenStorage";

const DEFAULT_API_BASE_URL = "https://passro.suplitter.com";
const DEFAULT_TIMEOUT_MS = 10_000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

function getTimeout() {
    const configuredTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS);
    return Number.isFinite(configuredTimeout) && configuredTimeout > 0
        ? configuredTimeout
        : DEFAULT_TIMEOUT_MS;
}

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: getTimeout(),
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let tokenReissueRequest: Promise<TokenResponse> | null = null;

function reissueTokens(refreshToken: string): Promise<TokenResponse> {
    if (!tokenReissueRequest) {
        tokenReissueRequest = axios
            .post<ApiResponse<TokenResponse>>(
                `${API_BASE_URL}${API_ENDPOINTS.auth.reissue}`,
                { refreshToken },
                {
                    timeout: getTimeout(),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((response) => unwrapResponse(response.data))
            .finally(() => {
                tokenReissueRequest = null;
            });
    }

    return tokenReissueRequest;
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | RetryableRequestConfig
            | undefined;
        const requestUrl = originalRequest?.url;
        const responseBody = isApiErrorBody(error.response?.data)
            ? error.response.data
            : undefined;
        const isAuthRequest =
            requestUrl === API_ENDPOINTS.auth.login ||
            requestUrl === API_ENDPOINTS.auth.reissue;
        const isAuthenticationFailure =
            error.response?.status === 401 ||
            (error.response?.status === 403 && !responseBody?.code);

        if (
            !isAuthenticationFailure ||
            !originalRequest ||
            originalRequest._retry ||
            isAuthRequest
        ) {
            return Promise.reject(error);
        }

        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
            tokenStorage.clearTokens();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const tokens = await reissueTokens(refreshToken);
            tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            return apiClient.request(originalRequest);
        } catch {
            tokenStorage.clearTokens();
            return Promise.reject(error);
        }
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

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await apiClient.request<ApiResponse<T>>(config);
        return unwrapResponse(response.data);
    } catch (error) {
        throw normalizeError(error);
    }
}
