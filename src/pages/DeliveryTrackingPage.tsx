import { useState } from "react";
import ChevronIcon from "../assets/icons/ChevronIcon";
import { DeliveryImageUploader } from "../components/delivery/DeliveryImageUploader";
import { DeliveryPersonCard } from "../components/delivery/DeliveryPersonCard";
import { DeliveryProgress } from "../components/delivery/DeliveryProgress";
import { DeliveryStatus } from "../types/delivery";
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
            navigate("/delivery/complete");
        }
    };
    const buttonText = {
        WAITING_PICKUP: "인수 확인",
        DELIVERING: "전달 완료",
        COMPLETED: "",
    }[status];

    return (
        <div className="page-container relative">
            <div className="flex relative items-center justify-center text-gray-500">
                <div className="absolute left-0">
                    <button onClick={() => navigate(-1)}>
                        <ChevronIcon />
                    </button>
                </div>
                <div className="font-bold text-xl text-gray-900">배송 추적</div>
            </div>
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
            <button
                onClick={handleButtonClick}
                className="absolute bottom-10 left-5 right-5 py-3.5 rounded-lg items-center justify-center text-gray-900 font-semibold bg-gray-100"
            >
                {buttonText}
            </button>
        </div>
    );
}
