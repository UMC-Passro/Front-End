import { useNavigate } from "react-router-dom";
import ChevronIcon from "../assets/icons/ChevronIcon";
import DeliveryStatusStepper from "../components/delivery/DeliveryStatusStepper";

const timelineItems = [
  { label: "전달 신청", time: "06.05(금) 11:05" },
  { label: "물품 픽업", time: "06.05(금) 11:25" },
];

function ChatBubbleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M8 10.5h8M8 13.5h5.5M9.2 16.5 7 18v-3"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function DeliveryStatusPage() {
  const navigate = useNavigate();

  return (
    <main className="page-container flex flex-col bg-white px-4 pb-2.5 pt-2.5 text-[#202126]">
      <header className="relative flex h-8 items-center justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-0 flex h-8 w-8 items-center justify-center text-[#8E91A1]"
          aria-label="이전 페이지로 이동"
        >
          <ChevronIcon />
        </button>
        <h1 className="text-[20px] font-extrabold leading-8">전달 추적</h1>
      </header>

      <DeliveryStatusStepper />

      <section className="mt-[43px]">
        <h2 className="text-[15px] font-extrabold leading-[22px]">전달자 정보</h2>

        <article className="mt-3 flex h-[66px] items-center rounded-[10px] bg-[#F8F9FD] px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2E3038]">
            <img src="/Logo.png" alt="" className="h-8 w-8 object-contain" />
          </div>

          <div className="ml-3 min-w-0">
            <p className="text-[15px] font-extrabold leading-[20px]">송현수</p>
            <p className="mt-0.5 text-[10px] font-semibold leading-[14px] text-[#8E91A1]">
              강북구 대학교 재학
            </p>
          </div>

          <button
            type="button"
            className="ml-auto flex h-8 w-8 items-center justify-center text-[#B5B7C4] transition-colors hover:text-[#8581F6]"
            aria-label="전달자 채팅 열기"
          >
            <ChatBubbleIcon />
          </button>
        </article>
      </section>

      <section className="mt-[42px]">
        <h2 className="text-[15px] font-extrabold leading-[22px]">전달 타임라인</h2>

        <ol className="relative mt-[23px] ml-[18px] flex flex-col gap-[23px]">
          <span
            className="absolute left-[3px] top-[11px] h-[48px] border-l border-dashed border-[#D8DAE6]"
            aria-hidden="true"
          />

          {timelineItems.map((item) => (
            <li key={item.label} className="relative flex items-center gap-[18px]">
              <span className="relative z-10 h-[9px] w-[9px] rounded-full bg-[#8581F6]" />
              <span className="min-w-[54px] text-[13px] font-extrabold leading-[18px]">
                {item.label}
              </span>
              <time className="text-[13px] font-bold leading-[18px] text-[#9EA2B3]">
                {item.time}
              </time>
            </li>
          ))}
        </ol>
      </section>

      <button
        type="button"
        className="font-bold mt-auto h-[44px] w-full rounded-[8px] bg-[#E1E3EC] font-extrabold leading-[18px] text-[#202126] transition-colors hover:bg-[#D8DAE6]"
      >
        완료 확인
      </button>
    </main>
  );
}
