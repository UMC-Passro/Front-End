import { useNavigate } from "react-router-dom";
import { DeliveryProgress } from "../components/delivery/DeliveryProgress";
import { useState } from "react";
import { DeliveryStatus } from "../types/delivery/delivery";
import { DeliveryPersonCard } from "../components/delivery/DeliveryPersonCard";
import PageHeader from "../components/common/PageHeader";

const timelineItems = [
    { label: "전달 신청", time: "06.05(금) 11:05" },
    { label: "물품 픽업", time: "06.05(금) 11:25" },
];

export default function DeliveryStatusPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<DeliveryStatus>("DELIVERING");

    return (
        <div className="page-container relative flex flex-col overflow-hidden">
            <PageHeader
                title="배송 추적"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />
            <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                <DeliveryProgress status={status} />

                <div className="flex flex-col mt-8 gap-3">
                    <span className="text-gray-900 font-bold">전달자 정보</span>
                    <DeliveryPersonCard />
                </div>

                <section className="mt-12">
                    <h2 className="text-[17px] font-bold">전달 타임라인</h2>

                    <ol className="relative mt-[23px] ml-[18px] flex flex-col gap-[23px]">
                        <span
                            className="absolute left-[4.5px] top-[11px] h-[48px] border border-dashed border-gray-100"
                            aria-hidden="true"
                        />

                        {timelineItems.map((item) => (
                            <li
                                key={item.label}
                                className="relative flex items-center"
                            >
                                <span className="relative z-10 w-2.5 h-2.5 mr-[15px] rounded-full bg-purple-500" />
                                <span className="text-[15px] font-semibold mr-7">
                                    {item.label}
                                </span>
                                <time className="text-sm font-semibold text-gray-500">
                                    {item.time}
                                </time>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>

            <button
                type="button"
                className="absolute bottom-5 left-5 right-5 rounded-lg bg-gray-100 py-3.5 font-semibold text-gray-900 transition-colors hover:bg-[#D8DAE6]"
            >
                완료 확인
            </button>
        </div>
    );
}
