import { memo } from "react";
import BottomSheet from "../common/BottomSheet";

const BREAKDOWN_ITEMS = [
    { label: "기본 요금", value: "2,500 P" },
    { label: "거리 요금", value: "+ 200 P" },
    { label: "무게 요금", value: "+ 500 P" },
];

const TOTAL_LABEL = "최종 정산 금액";
const TOTAL_VALUE = "3,200 P";

interface DeliveryPaymentSheetProps {
    onConfirm?: () => void;
    onClose?: () => void;
}

function DeliveryPaymentSheet({
    onConfirm,
    onClose,
}: DeliveryPaymentSheetProps) {
    return (
        <BottomSheet
            title="정산 금액"
            titleAlign="left"
            onClose={onClose}
            footer={
                <button
                    type="button"
                    onClick={onConfirm}
                    className="flex w-full py-3.5 items-center justify-center rounded-lg bg-gray-800 font-bold text-white transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#373840] focus:ring-offset-2"
                >
                    확인
                </button>
            }
        >
            <div className="flex flex-col gap-2.5">
                {BREAKDOWN_ITEMS.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between"
                    >
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-lg font-semibold text-gray-600">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="my-4 h-px bg-gray-100" aria-hidden="true" />

            <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">
                    {TOTAL_LABEL}
                </span>
                <span className="text-2xl font-bold text-purple-600">
                    {TOTAL_VALUE}
                </span>
            </div>
        </BottomSheet>
    );
}

export default memo(DeliveryPaymentSheet);
