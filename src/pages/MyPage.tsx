import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../components/profile/ProfilePage";
import type { ProfilePageData } from "../types/user";
import { getCurrentUser, logout } from "../utils/auth";

export default function MyPage() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser()!;

    const profileData = useMemo<ProfilePageData>(() => {
        const isShipper = currentUser.role === "shipper";

        return {
            profile: {
                id: currentUser.id,
                name: currentUser.nickname || currentUser.name,
                email: currentUser.profileEmail || currentUser.email,
                schoolName: "",
                department: "",
                role: currentUser.role,
                verificationStatus: "verified",
                rating: 0,
                reviewCount: 0,
                pointBalance: 0,
            },

            stats: {
                deliveryRequests: 0,
                completedDeliveries: 0,
                savedRoutes: 0,
                acceptanceRate: isShipper ? 0 : undefined,
            },
        };
    }, [currentUser]);

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
