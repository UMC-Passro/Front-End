import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { DeliveryInfo } from "../components/delivery/DeliveryInfo";
import { DeliveryRoute } from "../components/delivery/DeliveryRoute";

export default function DeliveryMatchingPage() {
    const navigate = useNavigate();
    const handleAccept = () => {
        navigate("/delivery/tracking");
    };
    const handleReject = () => {
        navigate(-1);
    };

    return (
        <div className="page-container flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="매칭 요청"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />
            <div className="scrollbar-hidden flex-1 overflow-y-auto pb-6">
                <DeliveryRoute departure="안양역" destination="정왕역" />
                <DeliveryInfo
                    itemName="무인양품 티셔츠"
                    itemPrice="3 만원"
                    itemSize="S"
                    settlementPoint="3,200P"
                />
            </div>
            <div className="flex w-full shrink-0 gap-3.5 pt-4">
                <button
                    onClick={handleReject}
                    className="flex flex-1 items-center justify-center bg-gray-100 text-gray-600 font-bold rounded-lg px-2.5 py-3.5"
                >
                    거절하기
                </button>
                <button
                    onClick={handleAccept}
                    className="flex flex-1 items-center justify-center bg-purple-500 text-white font-bold rounded-lg px-2.5 py-3.5"
                >
                    수락하기
                </button>
            </div>
        </div>
    );
}
