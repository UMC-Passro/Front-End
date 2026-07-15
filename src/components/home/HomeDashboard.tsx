import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HomeContent } from "../../types/home";
import type { UserRole } from "../../types/user";
import DeliveryConsentSheet from "../delivery/DeliveryConsentSheet";
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
  const navigate = useNavigate();
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const isSender = role === "sender";

  return (
    <main className="flex min-h-screen justify-center bg-white text-[#202126] sm:bg-gray-100">
      <section className="relative min-h-screen w-full max-w-[512px] overflow-hidden bg-white">
        <div
          className={`flex min-h-screen flex-col px-6 pb-10 pt-7 transition duration-200 min-[390px]:px-8 min-[390px]:pt-14 ${
            isConsentOpen ? "pointer-events-none blur-sm" : ""
          }`}
          aria-hidden={isConsentOpen}
        >
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
              onClick={() => setIsConsentOpen(true)}
              className="mt-auto h-9 w-full rounded-lg bg-purple-600 text-[11px] font-extrabold text-white shadow-sm transition-colors hover:bg-purple-500 min-[390px]:h-12 min-[390px]:text-base"
            >
              {content.actionLabel}
            </button>
          ) : null}
        </div>

        {isConsentOpen ? (
          <DeliveryConsentSheet
            onClose={() => setIsConsentOpen(false)}
            onConfirm={() => {
              setIsConsentOpen(false);
              navigate("/delivery/request");
            }}
          />
        ) : null}
      </section>
    </main>
  );
}
