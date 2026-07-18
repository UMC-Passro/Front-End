import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../components/profile/ProfilePage";
import type { ProfilePageData } from "../types/user";
import { getCurrentUser, logout } from "../utils/auth";

export default function MyPage() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser()!;

    const profileData = useMemo<ProfilePageData>(() => {
        const isCarrier = currentUser.role === "carrier";

        return {
            profile: {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
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
                acceptanceRate: isCarrier ? 0 : undefined,
            },
        };
    }, [currentUser]);

    const handleEditProfile = useCallback(() => {
        navigate("/mypage/edit");
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

    const handleLogout = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [navigate]);

    return (
        <ProfilePage
            data={profileData}
            onBack={handleBack}
            onEditProfile={handleEditProfile}
            onManageRoutes={handleManageRoutes}
            onViewPoints={handleViewPoints}
            onViewHistory={handleViewHistory}
            onLogout={handleLogout}
        />
    );
}
