import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../components/profile/ProfilePage";
import type { ProfilePageData } from "../types/user";
import { getCurrentUser, logout } from "../utils/auth";
import { accountApi } from "../apis/accountApi";
import { useApiRequest } from "../hooks/useApiRequest";

export default function MyPage() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser()!;

    const loadProfile = useCallback(() => accountApi.getProfile(), []);
    const profileRequest = useApiRequest(loadProfile);

    useEffect(() => {
        void profileRequest.execute().catch(() => undefined);
    }, [profileRequest.execute]);

    const profileData = useMemo<ProfilePageData | undefined>(() => {
        const profile = profileRequest.data;

        if (!profile) {
            return undefined;
        }

        const isShipper = currentUser.role === "shipper";

        return {
            profile: {
                id: currentUser.id,
                name: profile.nickname || profile.name,
                email: currentUser.profileEmail || currentUser.email,
                schoolName: "",
                department: "",
                avatarUrl: profile.picture,
                role: currentUser.role,
                verificationStatus: "verified",
                rating: profile.rating,
                reviewCount: 0,
                pointBalance: profile.point,
                joinedAt: profile.createdAt,
            },

            stats: {
                deliveryRequests: 0,
                completedDeliveries: profile.deliveryCount,
                savedRoutes: 0,
                acceptanceRate: isShipper ? 0 : undefined,
            },
        };
    }, [currentUser, profileRequest.data]);

    const handleEditProfile = useCallback(() => {
        navigate("/mypage/edit");
    }, [navigate]);

    const handleInquiry = useCallback(() => {
        navigate("/mypage/inquiry");
    }, [navigate]);

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleManageRoutes = useCallback(() => {
        navigate("/routes");
    }, [navigate]);

    const handleViewPoints = useCallback(() => {
        navigate("/mypage/point");
    }, [navigate]);

    const handleViewHistory = useCallback(() => {
        navigate("/mypage/history");
    }, [navigate]);

    const handleLogout = useCallback(async () => {
        await logout();
        navigate("/login", { replace: true });
    }, [navigate]);

    return (
        <ProfilePage
            data={profileData}
            isLoading={profileRequest.isLoading}
            error={profileRequest.error?.message ?? null}
            onRetry={() => void profileRequest.execute().catch(() => undefined)}
            onBack={handleBack}
            onEditProfile={handleEditProfile}
            onInquiry={handleInquiry}
            onManageRoutes={handleManageRoutes}
            onViewPoints={handleViewPoints}
            onViewHistory={handleViewHistory}
            onLogout={handleLogout}
        />
    );
}
