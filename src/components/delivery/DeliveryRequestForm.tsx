import { memo, useState } from "react";
import DeliveryPaymentSheet from "./DeliveryPaymentSheet";

interface DeliveryRequestFormProps {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onBack?: () => void;
}

function BackIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
      <path d="M7 1L1 7L7 13" stroke="#8E91A1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
      <path d="M1 1L7 7L13 1" stroke="#373840" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" aria-hidden="true">
      <rect x="0.5" y="3.5" width="21" height="15" rx="2.5" fill="#DADCE6" />
      <rect x="6" y="0.5" width="10" height="4" rx="1.5" fill="#DADCE6" />
      <circle cx="11" cy="11" r="4.5" fill="white" />
    </svg>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <p className="text-[14px] font-semibold leading-[22px] text-[#51525C]">{children}</p>;
}

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <button
      type="button"
      className="flex h-[52px] w-full items-center justify-between rounded-[10px] bg-[#F8F9FD] px-5 text-left"
    >
      <span className="text-[15px] font-medium leading-[22px] text-[#8E91A1]">{placeholder}</span>
      <ChevronDownIcon />
    </button>
  );
}

function TextField({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      className="h-[52px] w-full rounded-[10px] bg-[#F8F9FD] px-5 text-[15px] font-medium leading-[22px] text-[#373840] placeholder:text-[#8E91A1] focus:outline-none"
    />
  );
}

function PriceField() {
  const [value, setValue] = useState("");

  return (
    <div className="flex h-[52px] w-full items-center justify-between rounded-[10px] bg-[#F8F9FD] px-5">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="물품가액을 입력해주세요"
        className="w-full bg-transparent text-[15px] font-medium leading-[22px] text-[#373840] placeholder:text-[#8E91A1] focus:outline-none"
      />
      <span className="shrink-0 text-[15px] font-medium leading-[22px] text-[#373840]">만원</span>
    </div>
  );
}

function LoadingDeliveryRequestForm() {
  return (
    <section
      className="mx-auto flex h-screen w-full max-w-[402px] flex-col bg-white"
      aria-busy="true"
      aria-labelledby="delivery-request-loading-title"
    >
      <h1 id="delivery-request-loading-title" className="sr-only">
        배송 요청 정보를 불러오는 중
      </h1>
      <div className="flex h-14 shrink-0 items-center justify-center px-5">
        <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4">
        <div className="flex flex-col gap-5">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex flex-col gap-[10px]">
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
              <div className="h-[52px] w-full animate-pulse rounded-[10px] bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        배송 요청 화면을 불러오고 있습니다.
      </p>
    </section>
  );
}

function ErrorDeliveryRequestForm({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <section className="mx-auto flex h-screen w-full max-w-[402px] items-center bg-white px-5 py-6">
      <div className="w-full rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900" role="alert">
        <h1 className="text-lg font-semibold">배송 요청 화면을 불러오지 못했습니다</h1>
        <p className="mt-2 text-sm">{message}</p>
        {onRetry ? (
          <button
            type="button"
            className="mt-4 rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
            onClick={onRetry}
          >
            다시 시도
          </button>
        ) : null}
      </div>
    </section>
  );
}

function DeliveryRequestFormContent({ onBack }: { onBack?: () => void }) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="relative mx-auto h-screen w-full max-w-[402px] overflow-hidden bg-white">
      <div
        className={`flex h-full flex-col transition duration-200 ${
          isPaymentOpen ? "pointer-events-none blur-sm" : ""
        }`}
        aria-hidden={isPaymentOpen}
      >
        <header className="relative flex h-14 shrink-0 items-center justify-center px-5">
          <button
            type="button"
            className="absolute left-5 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
            onClick={onBack}
            aria-label="이전 페이지로 이동"
          >
            <BackIcon />
          </button>
          <h1 className="text-[21px] font-bold leading-[22px] text-[#1D1E23]">배송 요청</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[10px]">
              <FieldLabel>출발지</FieldLabel>
              <SelectField placeholder="출발지를 선택해주세요" />
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>도착지</FieldLabel>
              <SelectField placeholder="도착지를 선택해주세요" />
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>물품명</FieldLabel>
              <TextField placeholder="물품명을 입력해주세요" />
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>물품가액</FieldLabel>
              <PriceField />
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>물품 크기</FieldLabel>
              <SelectField placeholder="물품 크기를 선택해주세요" />
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>사진 등록</FieldLabel>
              <button
                type="button"
                className="flex h-[60px] w-[60px] flex-col items-center justify-center gap-[3px] rounded-[10px] bg-[#F8F9FD]"
                aria-label="사진 등록"
              >
                <CameraIcon />
                <span className="text-[10px] font-medium leading-[12px] text-[#C6C8D2]">0/3</span>
              </button>
            </div>

            <div className="flex flex-col gap-[10px]">
              <FieldLabel>메모</FieldLabel>
              <TextField placeholder="메모를 입력해주세요" />
            </div>
          </div>
        </div>

        <div className="shrink-0 px-5 py-[14px]">
          <button
            type="button"
            onClick={() => setIsPaymentOpen(true)}
            className="flex h-[50px] w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#6E73F5] text-[16px] font-bold leading-[22px] text-white transition hover:bg-[#5b60ec] focus:outline-none focus:ring-2 focus:ring-[#6E73F5] focus:ring-offset-2"
          >
            매칭 요청
          </button>
        </div>
      </div>

      {isPaymentOpen ? (
        <DeliveryPaymentSheet
          onClose={() => setIsPaymentOpen(false)}
          onConfirm={() => setIsPaymentOpen(false)}
        />
      ) : null}
    </div>
  );
}

function DeliveryRequestForm({ isLoading = false, error = null, onRetry, onBack }: DeliveryRequestFormProps) {
  if (isLoading) {
    return <LoadingDeliveryRequestForm />;
  }

  if (error) {
    return <ErrorDeliveryRequestForm message={error} onRetry={onRetry} />;
  }

  return <DeliveryRequestFormContent onBack={onBack} />;
}

export default memo(DeliveryRequestForm);
