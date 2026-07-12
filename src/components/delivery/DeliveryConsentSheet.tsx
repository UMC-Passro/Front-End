import { memo, useState } from "react";
import BottomSheet from "../common/BottomSheet";

const CONSENT_ITEMS = [
  "맡기는 물품은 배송 가능한 물품입니다.",
  "물품 정보를 정확하게 입력했습니다.",
  "운송 중 문제가 없도록 포장했습니다.",
  "수령인의 정보를 정확하게 입력했습니다.",
  "배송 제한 품목 및 보상 정책을 확인했습니다.",
  "내용을 확인하고 배송을 요청합니다.",
];

interface DeliveryConsentSheetProps {
  onConfirm?: () => void;
}

function DeliveryConsentSheet({ onConfirm }: DeliveryConsentSheetProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <BottomSheet
      title="[필수] 배송 요청 전 확인 및 동의"
      footer={
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#373840] text-[16px] font-bold leading-[22px] text-white transition hover:bg-[#20212a] focus:outline-none focus:ring-2 focus:ring-[#373840] focus:ring-offset-2"
        >
          배송 등록하기
        </button>
      }
    >
      <ul className="flex flex-col gap-1 text-[14px] font-normal leading-[22px] text-[#70727E]">
        {CONSENT_ITEMS.map((item) => (
          <li key={item} className="flex gap-1">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <label className="mt-6 flex items-center gap-[10px]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="h-5 w-5 rounded-[3px] border border-[#C6C8D2] accent-[#373840]"
        />
        <span className="text-[14px] font-medium leading-[22px] text-[#373840]">확인 및 동의합니다.</span>
      </label>
    </BottomSheet>
  );
}

export default memo(DeliveryConsentSheet);
