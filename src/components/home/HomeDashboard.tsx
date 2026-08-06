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
    isLoading?: boolean;
    errorMessage?: string;
    onRetry?: () => void;
};

export function HomeDashboard({
    role,
    content,
    isLoading = false,
    errorMessage,
    onRetry,
}: HomeDashboardProps) {
    const navigate = useNavigate();
    const [isConsentOpen, setIsConsentOpen] = useState(false);
    const [isRole, setIsRole] = useState(role);

    return (
        <section className="page-container relative flex h-full min-h-0 flex-col overflow-hidden pt-5">
            <div
                className={`flex min-h-0 flex-1 flex-col transition duration-200 ${isConsentOpen ? "pointer-events-none blur-sm" : ""
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
                        {isLoading ? (
                            <div
                                className="mt-3 h-[76px] animate-pulse rounded-lg bg-purple-50"
                                aria-label="배송 목록을 불러오는 중"
                            />
                        ) : errorMessage ? (
                            <div
                                className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-5 py-4"
                                role="alert"
                            >
                                <p className="text-sm font-medium text-rose-700">
                                    {errorMessage}
                                </p>
                                {onRetry ? (
                                    <button
                                        type="button"
                                        onClick={onRetry}
                                        className="mt-3 text-sm font-bold text-rose-700 underline"
                                    >
                                        다시 시도
                                    </button>
                                ) : null}
                            </div>
                        ) : content.activeDeliveries.length > 0 ? (
                            <div className="mt-3 flex flex-col gap-2.5">
                                {content.activeDeliveries.map((delivery) => (
                                    <ActiveDeliveryCard
                                        key={delivery.id}
                                        delivery={delivery}
                                        role={isRole}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-3 rounded-lg bg-purple-50 px-5 py-5 text-center text-sm font-medium text-purple-500">
                                진행 중인 배송이 없습니다.
                            </p>
                        )}
                    </section>

                    {isRole == "sender" ? (
                        <section className="mt-10">
                            <SectionTitle>배송 내역</SectionTitle>
                            {isLoading ? (
                                <div className="mt-3.5 flex flex-col gap-2.5">
                                    {[0, 1].map((item) => (
                                        <div
                                            key={item}
                                            className="h-[66px] animate-pulse rounded-lg bg-gray-50"
                                        />
                                    ))}
                                </div>
                            ) : errorMessage ? null : (
                                <RecentHistoryList
                                    histories={content.recentHistories}
                                />
                            )}
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

                {content.actionLabel ? (
                    <button
                        type="button"
                        onClick={() => setIsConsentOpen(true)}
                        className="w-full shrink-0 rounded-lg bg-purple-500 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-purple-600"
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
    );
}
