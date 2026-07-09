import ArrowIcon from "../../../assets/icons/ArrowIcon";

export const DeliveryList = () => {
    return (
        <div className="flex flex-col w-full gap-3.5 mt-6">
            <div className="flex items-center justify-between px-5 py-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                    <div className="font-bold">무인양품 티셔츠</div>
                    <div className="flex items-center font-semibold text-sm text-gray-500">
                        <div>안양 </div>
                        <ArrowIcon />
                        <div> 정왕역</div>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-[#5A60F9] px-2.5 py-1.5 rounded-lg text-white font-bold text-xs">
                    배송중
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                    <div className="font-bold">코알라 티셔츠</div>
                    <div className="font-semibold text-sm text-gray-500">
                        26.06.26
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-300 px-2.5 py-1.5 rounded-lg text-white font-bold text-xs">
                    배송완료
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                    <div className="font-bold">프로그래밍 전공책</div>
                    <div className="font-semibold text-sm text-gray-500">
                        26.06.20
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-300 px-2.5 py-1.5 rounded-lg text-white font-bold text-xs">
                    배송완료
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                    <div className="font-bold">선러브 모자</div>
                    <div className="font-semibold text-sm text-gray-500">
                        26.04.06
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-300 px-2.5 py-1.5 rounded-lg text-white font-bold text-xs">
                    배송완료
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                    <div className="font-bold">오렌지</div>
                    <div className="font-semibold text-sm text-gray-500">
                        26.04.01
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-300 px-2.5 py-1.5 rounded-lg text-white font-bold text-xs">
                    배송완료
                </div>
            </div>
        </div>
    );
};
