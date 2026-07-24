import type { ProfilePageData } from "../types/user";

export interface UpdateProfileRequest {
    nickname?: string;
    picture?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

/**
 * 백엔드 계정 API가 확정되면 이 계약을 구현합니다.
 * 가짜 엔드포인트 호출을 방지하기 위해 현재는 구현체를 제공하지 않습니다.
 */
export interface AccountApiContract {
    getMe(): Promise<ProfilePageData>;
    updateProfile(request: UpdateProfileRequest): Promise<ProfilePageData>;
    changePassword(request: ChangePasswordRequest): Promise<void>;
}
