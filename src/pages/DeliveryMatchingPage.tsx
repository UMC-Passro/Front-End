import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { matchingApi } from "../apis/matchingApi";
import PageHeader from "../components/common/PageHeader";
import { DeliveryInfo } from "../components/delivery/DeliveryInfo";
import { DeliveryRoute } from "../components/delivery/DeliveryRoute";

export default function DeliveryMatchingPage() {
    const navigate = useNavigate();
    const { deliveryId: deliveryIdParam } = useParams<{
        deliveryId: string;
    }>();
    const deliveryId = Number(deliveryIdParam);
    const [isAccepting, setIsAccepting] = useState(false);
    const [acceptError, setAcceptError] = useState<string | null>(null);

    const handleAccept = async () => {
        if (
            !Number.isSafeInteger(deliveryId) ||
            deliveryId <= 0 ||
            isAccepting
        ) {
            setAcceptError("올바르지 않은 배송 ID입니다.");
            return;
        }

        setIsAccepting(true);
        setAcceptError(null);

        try {
            await matchingApi.accept(deliveryId);
            navigate(`/delivery/tracking/${deliveryId}`);
        } catch (error) {
            setAcceptError(
                error instanceof Error
                    ? error.message
                    : "매칭 요청을 수락하지 못했습니다.",
            );
        } finally {
            setIsAccepting(false);
        }
    };

    return (
        <div className="page-container relative flex flex-col">
            <PageHeader title="매칭 요청" onBack={() => navigate(-1)} />
            <DeliveryRoute departure="안양역" destination="정자역" />
            <DeliveryInfo
                itemName="무인양품 셔츠"
                itemPrice="3만 원"
                itemSize="S"
                settlementPoint="3,200P"
            />
            {acceptError ? (
                <p
                    className="mb-2 text-center text-xs font-medium text-rose-600"
                    role="alert"
                >
                    {acceptError}
                </p>
            ) : null}
            <div className="absolute bottom-5 left-5 right-5 flex gap-3.5">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 px-2.5 py-3.5 font-bold text-gray-600"
                >
                    거절하기
                </button>
                <button
                    type="button"
                    onClick={handleAccept}
                    disabled={isAccepting}
                    className="flex flex-1 items-center justify-center rounded-lg bg-purple-500 px-2.5 py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:bg-purple-300"
                >
                    {isAccepting ? "처리 중..." : "수락하기"}
                </button>
            </div>
        </div>
    );
}
