import ChevronIcon from "../assets/icons/ChevronIcon";
import { DeliveryFilterButton } from "../components/delivery/history/DeliveryFilterButton";
import { DeliveryList } from "../components/delivery/history/DeliveryList";

export function HistoryStatsPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300 px-2">
            <div className="h-[874px] w-[402px] bg-white border border-black py-16 px-8">
                <div className="flex relative items-center justify-center text-gray-500">
                    <div className="absolute left-0">
                        <ChevronIcon />
                    </div>
                    <div className="font-bold text-xl text-gray-900">
                        배송 내역
                    </div>
                </div>
                <DeliveryFilterButton />
                <DeliveryList />
            </div>
        </div>
    );
}
