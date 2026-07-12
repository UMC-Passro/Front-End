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
}

function DeliveryPaymentSheet({ onConfirm }: DeliveryPaymentSheetProps) {
  return (
    <BottomSheet
      title="정산 금액"
      titleAlign="left"
      footer={
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#373840] text-[16px] font-bold leading-[22px] text-white transition hover:bg-[#20212a] focus:outline-none focus:ring-2 focus:ring-[#373840] focus:ring-offset-2"
        >
          확인
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        {BREAKDOWN_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[15px] font-medium leading-[22px] text-[#8E91A1]">{item.label}</span>
            <span className="text-[15px] font-semibold leading-[22px] text-[#373840]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="my-4 h-px bg-[#EDEEF3]" aria-hidden="true" />

      <div className="flex items-center justify-between">
        <span className="text-[16px] font-bold leading-[22px] text-[#1D1E23]">{TOTAL_LABEL}</span>
        <span className="text-[20px] font-extrabold leading-[22px] text-[#5A60F9]">{TOTAL_VALUE}</span>
      </div>
    </BottomSheet>
  );
}

export default memo(DeliveryPaymentSheet);
