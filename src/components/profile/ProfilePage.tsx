import { memo, useMemo } from "react";
import type { ProfilePageData, UserRole } from "../../types/user";
import ChevronIcon from "../../assets/icons/ChevronIcon";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
    data?: ProfilePageData;
    isLoading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    onBack?: () => void;
    onEditProfile?: () => void;
    onManageRoutes?: () => void;
    onViewPoints?: () => void;
    onViewHistory?: () => void;
    onLogout?: () => void;
}

const roleLabels: Record<UserRole, string> = {
    sender: "발송자",
    carrier: "배송자",
};

const numberFormatter = new Intl.NumberFormat("ko-KR");

function formatPoint(value: number) {
    return `${numberFormatter.format(value)}P`;
}

function getInitial(name: string) {
    return name.trim().charAt(0).toUpperCase() || "?";
}

function MoveIcon() {
    return (
        <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M1 1L7 7L1 13"
                stroke="#B3B5C1"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LoadingProfilePage() {
    return (
        <section
            className="mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-white"
            aria-busy="true"
            aria-labelledby="profile-loading-title"
        >
            <h1 id="profile-loading-title" className="sr-only">
                프로필 정보를 불러오는 중
            </h1>
            <div className="flex h-14 items-center justify-center px-5 pt-2">
                <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="flex flex-col items-center gap-6 px-5 pt-8 pb-6">
                <div className="h-[110px] w-[110px] animate-pulse rounded-full bg-slate-200" />
                <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
                    <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200" />
                </div>
            </div>
            <div className="px-5">
                <div className="h-[90px] w-full animate-pulse rounded-xl bg-indigo-200" />
            </div>
            <div className="flex flex-col gap-3 px-5 pt-6">
                <div className="h-[52px] w-full animate-pulse rounded-[10px] bg-slate-100" />
                <div className="h-[52px] w-full animate-pulse rounded-[10px] bg-slate-100" />
            </div>
            <p className="sr-only" role="status">
                프로필 데이터를 불러오고 있습니다.
            </p>
        </section>
    );
}

function ErrorProfilePage({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <section className="mx-auto flex min-h-screen w-full max-w-[402px] items-center bg-white px-5 py-6">
            <div
                className="w-full rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900"
                role="alert"
            >
                <h1 className="text-lg font-semibold">
                    프로필을 불러오지 못했습니다
                </h1>
                <p className="mt-2 text-sm">{message}</p>
                {onRetry ? (
                    <button
                        type="button"
                        className="mt-4 rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
                        onClick={onRetry}
                    >
                        다시 시도
                    </button>
                ) : null}
            </div>
        </section>
    );
}

function StatItem({
    label,
    value,
    onClick,
}: {
    label: string;
    value: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            className="flex flex-col items-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/60 disabled:cursor-default"
            onClick={onClick}
            disabled={!onClick}
        >
            <dd className="text-xl font-extrabold text-white">{value}</dd>
            <dt className="text-xs font-semibold text-purple-100">{label}</dt>
        </button>
    );
}

function MenuRow({ label, onClick }: { label: string; onClick?: () => void }) {
    return (
        <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-5 py-[15px] text-left transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
            onClick={onClick}
        >
            <span className="text-gray-700">{label}</span>
            <MoveIcon />
        </button>
    );
}

function ProfilePageContent({
    data,
    onBack,
    onEditProfile,
    onManageRoutes,
    onViewPoints,
    onViewHistory,
    onLogout,
}: Required<Pick<ProfilePageProps, "data">> &
    Pick<
        ProfilePageProps,
        | "onBack"
        | "onEditProfile"
        | "onManageRoutes"
        | "onViewPoints"
        | "onViewHistory"
        | "onLogout"
    >) {
    const { profile, stats } = data;
    const name = profile.name || "이름 없음";
    const role = profile.role ?? "sender";
    const rating = typeof profile.rating === "number" ? profile.rating : 0;
    const pointBalance =
        typeof profile.pointBalance === "number" ? profile.pointBalance : 0;
    const completedDeliveries =
        typeof stats?.completedDeliveries === "number"
            ? stats.completedDeliveries
            : 0;
    const hasCarrierFeatures = role === "carrier";

    const statItems = useMemo(() => {
        const items = [
            {
                label: "배송 내역",
                value: numberFormatter.format(completedDeliveries),
                onClick: onViewHistory,
            },
            {
                label: "포인트",
                value: formatPoint(pointBalance),
                onClick: onViewPoints,
            },
            {
                label: "평점",
                value: rating.toFixed(1),
                onClick: undefined,
            },
        ];

        if (hasCarrierFeatures && typeof stats?.acceptanceRate === "number") {
            items.push({
                label: "수락률",
                value: `${stats.acceptanceRate}%`,
                onClick: undefined,
            });
        }

        return items;
    }, [
        completedDeliveries,
        hasCarrierFeatures,
        onViewHistory,
        onViewPoints,
        pointBalance,
        rating,
        stats?.acceptanceRate,
    ]);

    return (
        <main className="page-container">
            <header className="relative flex items-center justify-center text-gray-500">
                <button
                    type="button"
                    className="absolute left-0 flex items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    onClick={onBack}
                    aria-label="이전 페이지로 이동"
                >
                    <ChevronIcon />
                </button>
                <h1 className="font-bold text-xl text-gray-900">마이페이지</h1>
            </header>

            <section
                className="flex flex-col items-center gap-6 pt-8 pb-6"
                aria-labelledby="profile-title"
            >
                {profile.avatarUrl ? (
                    <img
                        src={profile.avatarUrl}
                        alt={`${name} 프로필 사진`}
                        className="h-[110px] w-[110px] rounded-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div
                        className="flex h-[110px] w-[110px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-3xl font-bold text-slate-700"
                        aria-hidden="true"
                    >
                        {getInitial(name)}
                    </div>
                )}

                <div
                    className="flex flex-col items-center gap-[11px]"
                    id="profile-title"
                >
                    <p className="text-2xl font-bold text-gray-900">{name}</p>
                    <span className="flex items-center justify-center rounded-full bg-purple-100 px-4 py-[3px] text-xs font-bold text-purple-700">
                        {roleLabels[role]}
                    </span>
                </div>
            </section>

            <section
                className="flex w-full"
                aria-labelledby="profile-stats-title"
            >
                <h2 id="profile-stats-title" className="sr-only">
                    프로필 활동 요약
                </h2>
                <dl
                    className="flex w-full items-center justify-between rounded-xl py-5 divide-x divide-gray-300"
                    style={{
                        background:
                            "linear-gradient(92.52deg, #4541EB -3.06%, #636DFF 110.78%)",
                    }}
                >
                    {statItems.map((item, index) => (
                        <div
                            key={item.label}
                            className="flex flex-1 items-center justify-center"
                        >
                            <StatItem
                                label={item.label}
                                value={item.value}
                                onClick={item.onClick}
                            />
                        </div>
                    ))}
                </dl>
            </section>

            <section
                className="flex w-full mt-12"
                aria-labelledby="profile-menu-title"
            >
                <h2 id="profile-menu-title" className="sr-only">
                    프로필 설정 메뉴
                </h2>
                <div className="flex w-full flex-col gap-6">
                    <MenuRow label="프로필 설정" onClick={onEditProfile} />
                    <MenuRow label="로그아웃" onClick={onLogout} />
                </div>
            </section>
        </main>
    );
}

function ProfilePage({
    data,
    isLoading = false,
    error = null,
    onRetry,
    ...actions
}: ProfilePageProps) {
    if (isLoading) {
        return <LoadingProfilePage />;
    }

    if (error) {
        return <ErrorProfilePage message={error} onRetry={onRetry} />;
    }

    if (!data) {
        return (
            <ErrorProfilePage
                message="표시할 프로필 데이터가 없습니다."
                onRetry={onRetry}
            />
        );
    }

    return <ProfilePageContent data={data} {...actions} />;
}

export default memo(ProfilePage);
