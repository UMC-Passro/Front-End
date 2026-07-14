import type { HomeContent } from "../../types/home";
import type { UserRole } from "../../types/user";
import { ActiveDeliveryCard } from "./ActiveDeliveryCard";
import { HomeHeader } from "./HomeHeader";
import { MatchingRequestList } from "./MatchingRequestList";
import { RecentHistoryList } from "./RecentHistoryList";
import { SectionTitle } from "./SectionTitle";

type HomeDashboardProps = {
  role: UserRole;
  content: HomeContent;
};

export function HomeDashboard({ role, content }: HomeDashboardProps) {
  const isSender = role === "sender";

  return (
    <main className="flex min-h-screen justify-center bg-white text-[#202126] sm:bg-gray-100">
      <section className="flex min-h-screen w-full max-w-[512px] flex-col bg-white px-6 pb-10 pt-7 min-[390px]:px-8 min-[390px]:pt-14">
        <HomeHeader name={content.name} headline={content.headline} role={role} />

        <section className="mt-10 min-[390px]:mt-[72px]">
          <SectionTitle accent>진행중인 배송</SectionTitle>
          <ActiveDeliveryCard delivery={content.activeDelivery} />
        </section>

        {isSender ? (
          <section className="mt-8 min-[390px]:mt-12">
            <SectionTitle>최근 내역</SectionTitle>
            <RecentHistoryList histories={content.recentHistories} />
          </section>
        ) : (
          <section className="mt-12 min-[390px]:mt-14">
            <SectionTitle>매칭 요청</SectionTitle>
            <MatchingRequestList requests={content.matchingRequests} />
          </section>
        )}

        {content.actionLabel ? (
          <button
            type="button"
            className="mt-auto h-9 w-full rounded-lg bg-[#7470F4] text-[11px] font-extrabold text-white shadow-sm transition-colors hover:bg-[#6561EE] min-[390px]:h-12 min-[390px]:text-base"
          >
            {content.actionLabel}
          </button>
        ) : null}
      </section>
    </main>
  );
}
