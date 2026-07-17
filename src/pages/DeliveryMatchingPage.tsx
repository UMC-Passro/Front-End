import { useNavigate } from "react-router-dom";
import ChevronIcon from "../assets/icons/ChevronIcon";
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
        <div className="page-container">
            <div className="flex relative items-center justify-center text-gray-500">
                <div className="absolute left-0">
                    <ChevronIcon />
                </div>
                <div className="font-bold text-xl text-gray-900">매칭 요청</div>
            </div>
            <DeliveryRoute departure="안양역" destination="정왕역" />
            <DeliveryInfo
                itemName="무인양품 티셔츠"
                itemPrice="3 만원"
                itemSize="S"
                settlementPoint="3,200P"
            />
            <div className="fixed bottom-10 left-1/2 flex w-full max-w-[402px] -translate-x-1/2 gap-3.5 px-5">
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
