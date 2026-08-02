import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { DeliveryImageUploader } from "../components/delivery/DeliveryImageUploader";
import { DeliveryPersonCard } from "../components/delivery/DeliveryPersonCard";
import { DeliveryProgress } from "../components/delivery/DeliveryProgress";
import { DeliveryStatus } from "../types/delivery/delivery";
import { useNavigate } from "react-router-dom";

export default function DeliveryTrackingPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<DeliveryStatus>("WAITING_PICKUP");
    const handleButtonClick = () => {
        if (status === "WAITING_PICKUP") {
            setStatus("DELIVERING");
            return;
        }

        if (status === "DELIVERING") {
            navigate("/home", { replace: true });
        }
    };
    const buttonText = {
        WAITING_PICKUP: "인수 확인",
        DELIVERING: "전달 완료",
        COMPLETED: "",
    }[status];

    return (
        <div className="page-container relative flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="배송 추적"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />
            <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                <DeliveryProgress status={status} />

                {status === "WAITING_PICKUP" && (
                    <div className="mt-12">
                        <span className="flex text-gray-900 font-bold mb-3">
                            물품인수 사진 등록
                        </span>
                        <DeliveryImageUploader />
                    </div>
                )}
                <div className="flex flex-col mt-8 gap-3">
                    <span className="text-gray-900 font-bold">발송자 정보</span>
                    <DeliveryPersonCard />
                </div>
            </div>
            <button
                onClick={handleButtonClick}
                className="flex w-full shrink-0 items-center justify-center rounded-lg bg-gray-100 py-3.5 font-semibold text-gray-900"
            >
                {buttonText}
            </button>
        </div>
    );
}
