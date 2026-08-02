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
    const [isRole, setIsRole] = useState(role);

    return (
        <section className="page-container relative flex flex-col overflow-hidden pt-5">
            <div
                className={`flex flex-col h-full transition duration-200  ${
                    isConsentOpen ? "pointer-events-none blur-sm" : ""
                }`}
                aria-hidden={isConsentOpen}
            >
                <div className="shrink-0">
                    <HomeHeader
                        name={content.name}
                        headline={content.headline}
                        role={role}
                    />
                </div>

                <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                    <section className="mt-12">
                        <SectionTitle accent>진행중인 배송</SectionTitle>
                        <ActiveDeliveryCard
                            delivery={content.activeDelivery}
                            role={isRole}
                        />
                    </section>

                    {isRole == "sender" ? (
                        <section className="mt-10">
                            <SectionTitle>최근 내역</SectionTitle>
                            <RecentHistoryList
                                histories={content.recentHistories}
                            />
                        </section>
                    ) : (
                        <section className="mt-10">
                            <SectionTitle>매칭 요청</SectionTitle>
                            <MatchingRequestList
                                requests={content.matchingRequests}
                            />
                        </section>
                    )}
                </div>
            </div>
            {content.actionLabel ? (
                <button
                    type="button"
                    onClick={() => setIsConsentOpen(true)}
                    className="absolute bottom-5 left-5 right-5 rounded-lg bg-purple-500 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-purple-600"
                >
                    {content.actionLabel}
                </button>
            ) : null}

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
    );
}
