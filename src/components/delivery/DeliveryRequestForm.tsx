import { memo, useState } from "react";
import DeliveryPaymentSheet from "./DeliveryPaymentSheet";
import { CameraIcon } from "../../assets/icons/CameraIcon";
import StationSelectModal, { type Station } from "./StationSelectModal";
import PageHeader from "../common/PageHeader";

interface DeliveryRequestFormProps {
    isLoading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    onBack?: () => void;
}


function ChevronDownIcon() {
    return (
        <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M1 1L7 7L13 1"
                stroke="#373840"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FieldLabel({ children }: { children: string }) {
    return <p className="text-sm font-semibold text-gray-700">{children}</p>;
}

function SelectField({
    placeholder,
    value,
    onClick,
}: {
    placeholder: string;
    value?: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-haspopup="dialog"
            className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-5 py-4 text-left"
        >
            <span
                className={`text-[15px] ${value ? "font-medium text-gray-900" : "text-gray-500"
                    }`}
            >
                {value ?? placeholder}
            </span>
            <ChevronDownIcon />
        </button>
    );
}
function SizeGuideBridge() {
    return (
        <span className="relative inline-flex group">
            <button
                type="button"
                aria-label="물품 크기 안내"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8E91A1] text-[10px] font-bold leading-none text-white"
            >
                ?
            </button>

            <div className="invisible absolute left-0 top-6 z-30 w-[300px] max-w-[calc(100vw-40px)] overflow-hidden rounded-xl border border-[#EDEEF3] bg-white p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <table className="w-full table-fixed text-[13px]">
                    <thead>
                        <tr className="text-color-black">
                            <th className="pr-6 text-left font-semibold">사이즈</th>
                            <th className="pr-6 text-center font-semibold">크기(가로+세로+높이)</th>
                            <th className="text-center font-semibold">무게</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#8E91A1]">
                        <tr><td className="flex pr-6 pt-2 justify-center">S</td><td className="text-center pr-6 pt-2">~40 미만</td><td className="text-center pt-2">500g 미만</td></tr>
                        <tr><td className="flex justify-center pr-6 pt-2">M</td><td className="text-center pr-6 pt-2">40 ~ 70</td><td className="text-center items-center pt-2">500g ~ 1.5kg 미만</td></tr>
                        <tr><td className="flex justify-center pr-6 pt-2">L</td><td className="text-center pr-6 pt-2">70 ~ 100</td><td className="text-center pt-2">1.5kg ~ 3kg 미만</td></tr>

                    </tbody>
                </table>
            </div>
        </span>
    )
}

function SizeSelectField() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const options = ["S", "M", "L"];

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-[52px] w-full items-center justify-between rounded-[10px] bg-[#F8F9FD] px-5 text-left"
            >
                <span className={selected ? "text-[15px] font-medium text-[#373840]" : "text-[15px] font-medium text-[#8E91A1]"}>
                    {selected ?? "물품 크기를 선택해주세요"}
                </span>
                <ChevronDownIcon />
            </button>

            {isOpen ? (
                <div className="absolute inset-x-0 top-[58px] z-20 overflow-hidden rounded-[10px] border border-[#EDEEF3] bg-white shadow-lg">
                    {options.map((option) => (
                        <button key={option} type="button"
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                            className="flex h-11 w-full items-center px-5 text-[15px] font-medium text-[#373840] hover:bg-[#F8F9FD]">
                            {option}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
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
            className="w-full rounded-lg bg-gray-50 px-5 py-4 text-[15px] text-gray-800 placeholder:text-gray-500 focus:outline-none"
        />
    );
}

function PriceField() {
    const [value, setValue] = useState("");

    return (
        <div className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-5 py-4">
            <input
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="물품가액을 입력해주세요"
                className="w-full bg-transparent text-[15px] text-gray-800 placeholder:text-gray-500 focus:outline-none"
            />
            <span className="shrink-0 text-[15px] text-gray-800">만원</span>
        </div>
    );
}

function LoadingDeliveryRequestForm() {
    return (
        <section
            className="mx-auto flex h-full w-full max-w-[402px] flex-col bg-white"
            aria-busy="true"
            aria-labelledby="delivery-request-loading-title"
        >
            <h1 id="delivery-request-loading-title" className="sr-only">
                배송 요청 정보를 불러오는 중
            </h1>
            <div className="flex h-14 shrink-0 items-center justify-center px-5">
                <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="scrollbar-hidden flex-1 overflow-x-hidden overflow-y-auto px-5 pb-6 pt-4">
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

function ErrorDeliveryRequestForm({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <section className="mx-auto flex h-full w-full max-w-[402px] items-center bg-white px-5 py-6">
            <div
                className="w-full rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900"
                role="alert"
            >
                <h1 className="text-lg font-semibold">
                    배송 요청 화면을 불러오지 못했습니다
                </h1>
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
    const [stationField, setStationField] = useState<
        "origin" | "destination" | null
    >(null);
    const [originStation, setOriginStation] = useState<Station | null>(null);
    const [destinationStation, setDestinationStation] =
        useState<Station | null>(null);
    const isOverlayOpen = isPaymentOpen || stationField !== null;

    const handleStationSelect = (station: Station) => {
        if (stationField === "origin") {
            setOriginStation(station);
        }

        if (stationField === "destination") {
            setDestinationStation(station);
        }

        setStationField(null);
    };

    return (
        <div className="relative mx-auto flex h-full w-full max-w-[402px] flex-col bg-white">
            <div
                className={`flex min-h-0 flex-1 flex-col transition duration-100 ${isOverlayOpen ? "pointer-events-none blur-sm" : ""
                    }`}
                aria-hidden={isOverlayOpen}
            >
                <PageHeader
                    title="배송 요청"
                    onBack={onBack}
                    className="mx-4 mt-3 shrink-0"
                />

                <div className="scrollbar-hidden flex-1 overflow-x-hidden overflow-y-auto px-5 pb-6 pt-4">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-[10px]">
                            <FieldLabel>출발지</FieldLabel>
                            <SelectField
                                placeholder="출발지를 선택해주세요"
                                value={originStation?.name}
                                onClick={() => setStationField("origin")}
                            />
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <FieldLabel>도착지</FieldLabel>
                            <SelectField
                                placeholder="도착지를 선택해주세요"
                                value={destinationStation?.name}
                                onClick={() => setStationField("destination")}
                            />
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
                            <div className="flex items-center gap-1">
                                <FieldLabel>물품 크기</FieldLabel>
                                <SizeGuideBridge />
                            </div>
                            <SizeSelectField />
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <FieldLabel>사진 등록</FieldLabel>
                            <button
                                type="button"
                                className="flex h-[60px] w-[60px] flex-col items-center justify-center gap-[3px] rounded-[10px] bg-[#F8F9FD]"
                                aria-label="사진 등록"
                            >
                                <CameraIcon />
                                <span className="text-[10px] font-medium leading-3 text-gray-300">
                                    0/3
                                </span>
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
                        className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-purple-500 text-[16px] font-bold leading-[22px] text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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

            {stationField ? (
                <StationSelectModal
                    title={
                        stationField === "origin"
                            ? "출발역 선택"
                            : "도착역 선택"
                    }
                    onClose={() => setStationField(null)}
                    onSelect={handleStationSelect}
                />
            ) : null}
        </div>
    );
}

function DeliveryRequestForm({
    isLoading = false,
    error = null,
    onRetry,
    onBack,
}: DeliveryRequestFormProps) {
    if (isLoading) {
        return <LoadingDeliveryRequestForm />;
    }

    if (error) {
        return <ErrorDeliveryRequestForm message={error} onRetry={onRetry} />;
    }

    return <DeliveryRequestFormContent onBack={onBack} />;
}

export default memo(DeliveryRequestForm);
