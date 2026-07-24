import { HomeDashboard } from "../components/home/HomeDashboard";
import type {
    ActiveDelivery,
    HomeContent,
    MatchingRequest,
    RecentHistory,
} from "../types/home";
import type { UserRole } from "../types/user";
import { getCurrentUser, getSelectedUserRole } from "../utils/auth";

const activeDelivery: ActiveDelivery = {
    title: "무인양품 티셔츠",
    route: "안양 -> 정왕역",
    status: "배송중",
};

const matchingRequests: MatchingRequest[] = [
    {
        id: 1,
        title: "전공 페이퍼",
        route: "안양 -> 정왕역",
        timeLeft: "10분",
    },
    {
        id: 2,
        title: "오렌지 한 박스",
        route: "안양 -> 정왕역",
        timeLeft: "8분",
    },
];

const recentHistories: RecentHistory[] = [
    {
        id: 1,
        title: "코알라 티셔츠",
        date: "26.06.26",
        status: "배송완료",
    },
    {
        id: 2,
        title: "프로그래밍 전공책",
        date: "26.06.20",
        status: "배송완료",
    },
    {
        id: 3,
        title: "햄버거 세트",
        date: "26.05.08",
        status: "배송완료",
    },
];

const homeContentByRole: Record<UserRole, HomeContent> = {
    carrier: {
        name: "현수",
        headline: "배송을 시작해보세요!",
        activeDelivery,
        matchingRequests,
        recentHistories: [],
    },
    sender: {
        name: "김자취러김",
        headline: "배송을 요청해보세요!",
        activeDelivery,
        matchingRequests: [],
        recentHistories,
        actionLabel: "배송 요청하기",
    },
};

export default function HomePage() {
    const currentUser = getCurrentUser();
    const userRole = getSelectedUserRole() ?? currentUser?.role ?? "carrier";
    const content = homeContentByRole[userRole];

    return <HomeDashboard role={userRole} content={content} />;
}
