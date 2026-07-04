import { memo, useMemo } from "react";
import type { ProfilePageData, SchoolVerificationStatus, UserRole } from "../../types/user";

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

const verificationLabels: Record<SchoolVerificationStatus, string> = {
  verified: "학교 인증 완료",
  pending: "학교 인증 대기",
  rejected: "학교 인증 반려",
  none: "학교 미인증",
};

const verificationStyles: Record<SchoolVerificationStatus, string> = {
  verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  none: "bg-slate-100 text-slate-600 ring-slate-200",
};

const numberFormatter = new Intl.NumberFormat("ko-KR");
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
});

function formatPoint(value: number) {
  return `${numberFormatter.format(value)}P`;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function LoadingProfilePage() {
  return (
    <section
      className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white"
      aria-busy="true"
      aria-labelledby="profile-loading-title"
    >
      <h1 id="profile-loading-title" className="sr-only">
        프로필 정보를 불러오는 중
      </h1>
      <div className="flex h-16 items-center border-b border-slate-200 px-4">
        <div className="h-7 w-7 animate-pulse rounded bg-slate-200" />
        <div className="mx-auto h-6 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-7 w-7" />
      </div>
      <div className="px-5 py-6">
        <div className="flex animate-pulse items-center gap-4 border-b border-slate-200 pb-6">
          <div className="h-20 w-20 shrink-0 rounded-full bg-slate-200" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-5 w-28 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
          </div>
          <div className="h-8 w-20 rounded-full bg-slate-200" />
        </div>
        <div className="grid grid-cols-3 border-b border-slate-200 py-6">
          {["완료배송", "포인트", "평점"].map((label) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="h-7 w-12 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="pt-6">
          <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <p className="sr-only" role="status">
        프로필 데이터를 불러오고 있습니다.
      </p>
    </section>
  );
}

function ErrorProfilePage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md items-center bg-white px-5 py-6">
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900" role="alert">
        <h1 className="text-lg font-semibold">프로필을 불러오지 못했습니다</h1>
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

function StatItem({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex min-h-20 flex-col items-center justify-center gap-1 border-r border-slate-200 px-2 text-center last:border-r-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-900 disabled:cursor-default"
      onClick={onClick}
      disabled={!onClick}
    >
      <dd className="order-1 text-2xl font-bold leading-none text-slate-950">{value}</dd>
      <dt className="order-2 text-sm font-semibold text-slate-700">{label}</dt>
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
  Pick<ProfilePageProps, "onBack" | "onEditProfile" | "onManageRoutes" | "onViewPoints" | "onViewHistory" | "onLogout">) {
  const { profile, primaryRoute, stats } = data;
  const hasCarrierFeatures = profile.role === "carrier";

  const statItems = useMemo(
    () => {
      const items = [
          {
              label: "완료배송",
              value: numberFormatter.format(stats.completedDeliveries),
              onClick: onViewHistory,
            },
            {
              label: "포인트",
              value: formatPoint(profile.pointBalance),
              onClick: onViewPoints,
            },
        {
              label: "평점",
              value: profile.rating.toFixed(1),
              onClick: undefined,
        },
      ];

      if (hasCarrierFeatures && typeof stats.acceptanceRate === "number") {
        items.push({
          label: "수락률",
          value: `${stats.acceptanceRate ?? 0}%`,
          onClick: undefined,
        });
      }

      return items.filter((item) => item !== null);
    },
    [
      hasCarrierFeatures,
      onViewHistory,
      onViewPoints,
      profile.pointBalance,
      profile.rating,
      profile.reviewCount,
      stats.acceptanceRate,
      stats.completedDeliveries,
    ],
  );
  const statGridClass = statItems.length >= 4 ? "grid-cols-4" : statItems.length === 2 ? "grid-cols-2" : "grid-cols-1";

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-white text-slate-950">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b border-slate-200 bg-white px-4">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-3xl leading-none text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
          onClick={onBack}
          aria-label="이전 페이지로 이동"
        >
          ←
        </button>
        <h1 className="flex-1 pr-11 text-center text-xl font-bold">마이페이지</h1>
      </header>

      <section
        className="border-b border-slate-200 px-5 py-6"
        aria-labelledby="profile-title"
      >
        <div className="flex items-center gap-4">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile.name} 프로필 사진`}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-200"
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-100 text-3xl font-bold text-slate-700"
              aria-hidden="true"
            >
              {getInitial(profile.name)}
            </div>
          )}

          <div className="min-w-0 flex-1" id="profile-title">
            <p className="truncate text-xl font-bold">{profile.name}</p>
            <p className="mt-1 truncate text-sm font-medium text-slate-600">{profile.email}</p>
          </div>

          <span className="shrink-0 rounded-full border border-slate-900 px-4 py-2 text-sm font-bold text-slate-900">
            {roleLabels[profile.role]}
          </span>
        </div>
      </section>

      {  
        <section className="border-b border-slate-200 px-5 py-5" aria-labelledby="profile-stats-title">
          <h2 id="profile-stats-title" className="sr-only">
            프로필 활동 요약
          </h2>
          <dl className={`grid ${hasCarrierFeatures ? "grid-cols-4" : "grid-cols-3"}`}>
            {statItems.map((item) => (
              <StatItem key={item.label} label={item.label} value={item.value} onClick={item.onClick} />
            ))}
          </dl>
        </section>
      }

      <section
        className="px-5 py-6"
        aria-labelledby="profile-info-title"
      >
        <div className="flex flex-col gap-3" aria-label="프로필 설정">
          <button
            type="button"
            className="w-full rounded-lg border border-slate-200 px-4 py-4 text-left text-base font-bold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
            onClick={onEditProfile}
          >
            프로필 편집
          </button>
          <button
            type="button"
            className="w-full rounded-lg border border-rose-200 px-4 py-4 text-left text-base font-bold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
}

function ProfilePage({ data, isLoading = false, error = null, onRetry, ...actions }: ProfilePageProps) {
  if (isLoading) {
    return <LoadingProfilePage />;
  }

  if (error) {
    return <ErrorProfilePage message={error} onRetry={onRetry} />;
  }

  if (!data) {
    return <ErrorProfilePage message="표시할 프로필 데이터가 없습니다." onRetry={onRetry} />;
  }

  return <ProfilePageContent data={data} {...actions} />;
}

export default memo(ProfilePage);
