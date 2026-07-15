import ChevronIcon from "../assets/icons/ChevronIcon";
import { PointFilterButton } from "../components/points/PointFilterButton";
import { PointList } from "../components/points/PointList";
import { TotalPoint } from "../components/points/TotalPoint";

export default function PointPage() {
    return (
        <div className="page-container">
            <div className="flex relative items-center justify-center text-gray-500">
                <div className="absolute left-0">
                    <ChevronIcon />
                </div>
                <div className="font-bold text-xl text-gray-900">포인트</div>
            </div>
            <TotalPoint />
            <PointFilterButton />
            <div className="my-5 font-bold text-gray-800">적립 내역</div>
            <PointList />
        </div>
    );
}
