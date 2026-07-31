import { useState, type FormEvent } from "react";
import type { SignupFieldUpdater, SignupFormData } from "../../../types/signup";
import { formatPhoneNumber } from "../../../utils/signupFormatters";
import {
    getDetailValidationMessages,
    hasDetailValidationError,
} from "../../../utils/signupValidation";
import DatePickerSheet from "../date-picker/DatePickerSheet";
import SignupSubmitButton from "../common/SignupSubmitButton";
import ValidationMessage from "../common/ValidationMessage";
import BirthDateField from "./BirthDateField";
import DetailTextField from "./DetailTextField";
import StationSelectModal, {
    type Station,
} from "../../delivery/StationSelectModal";

type DetailSignupFormProps = {
    formData: SignupFormData;
    updateField: SignupFieldUpdater;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
};



function FieldLabel({ children }: { children: string }) {
    return <p className="text-sm font-semibold text-gray-700 ml-[4px]">{children}</p>;
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

export default function DetailSignupForm({
    formData,
    updateField,
    onSubmit,
    isSubmitting,
}: DetailSignupFormProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [stationField, setStationField] = useState<
        "origin" | "destination" | null
    >(null);
    const [showValidation, setShowValidation] = useState(false);
    const validationMessages = getDetailValidationMessages(formData);

    const handleStationSelect = (station: Station) => {
        if (stationField === "origin") {
            updateField("originStation", station);
        }

        if (stationField === "destination") {
            updateField("destinationStation", station);
        }

        setStationField(null);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowValidation(true);

        if (hasDetailValidationError(validationMessages)) {
            return;
        }

        onSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-col gap-5">
                <DetailTextField
                    id="signup-name"
                    label="이름"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={formData.name}
                    validationMessage={validationMessages.name}
                    validationFallback="이름 검증 메시지"
                    showValidation={showValidation}
                    onChange={(value) => updateField("name", value)}
                />
                <DetailTextField
                    id="signup-phone"
                    label="전화번호"
                    type="tel"
                    placeholder="전화번호를 입력해주세요"
                    value={formData.phone}
                    validationMessage={validationMessages.phone}
                    validationFallback="전화번호 검증 메시지"
                    showValidation={showValidation}
                    onChange={(value) =>
                        updateField("phone", formatPhoneNumber(value))
                    }
                />
                <BirthDateField
                    value={formData.birthDate}
                    validationMessage={validationMessages.birthDate}
                    showValidation={showValidation}
                    onOpen={() => setIsDatePickerOpen(true)}
                />
                <div className="flex flex-col gap-[4px]">
                    <FieldLabel>통학로 설정</FieldLabel>
                    <SelectField
                        placeholder="출발지를 선택해주세요"
                        value={formData.originStation?.name}
                        onClick={() => setStationField("origin")}
                    />
                    <ValidationMessage
                        message={validationMessages.originStation}
                        fallback=""
                        visible={
                            showValidation &&
                            Boolean(validationMessages.originStation)
                        }
                    />
                    <div className="flex flex-row gap-[10px] justify-center items-center mt-[10px] mb-[10px]">
                        <div className="w-[100px] text-right font-semibold text-[13px] text-gray-500">경유지 추가</div>
                        <div className="w-2  font-semibold text-[13px] text-gray-200">|</div>
                        <div className="w-[100px] text-left font-semibold text-[13px] text-purple-500">환승역 자동설정</div>
                    </div>

                    <SelectField
                        placeholder="도착지를 선택해주세요"
                        value={formData.destinationStation?.name}
                        onClick={() => setStationField("destination")}
                    />
                    <ValidationMessage
                        message={validationMessages.destinationStation}
                        fallback=""
                        visible={
                            showValidation &&
                            Boolean(validationMessages.destinationStation)
                        }
                    />
                </div>
            </div>

            <div className="fixed bottom-[15px] w-[100%]" style={{ "maxWidth": "min(361px, calc(100% - 42px))" }}>
                <SignupSubmitButton disabled={isSubmitting}>
                    {isSubmitting ? "가입 처리 중..." : "회원 가입 완료"}
                </SignupSubmitButton>
            </div>

            {isDatePickerOpen ? (
                <DatePickerSheet
                    value={formData.birthDate}
                    onClose={() => setIsDatePickerOpen(false)}
                    onConfirm={(nextDate) => {
                        updateField("birthDate", nextDate);
                        setIsDatePickerOpen(false);
                    }}
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
        </form>
    );
}
