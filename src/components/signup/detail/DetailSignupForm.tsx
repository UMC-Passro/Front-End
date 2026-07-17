import { useState, type FormEvent } from "react";
import type { SignupFieldUpdater, SignupFormData } from "../../../types/signup";
import { formatPhoneNumber } from "../../../utils/signupFormatters";
import {
    getDetailValidationMessages,
    hasDetailValidationError,
} from "../../../utils/signupValidation";
import DatePickerSheet from "../date-picker/DatePickerSheet";
import SignupSubmitButton from "../common/SignupSubmitButton";
import BirthDateField from "./BirthDateField";
import DetailTextField from "./DetailTextField";

type DetailSignupFormProps = {
    formData: SignupFormData;
    updateField: SignupFieldUpdater;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function DetailSignupForm({
    formData,
    updateField,
    onSubmit,
}: DetailSignupFormProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const validationMessages = getDetailValidationMessages(formData);

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
                <DetailTextField
                    id="signup-address"
                    label="주소"
                    type="text"
                    placeholder="주소를 입력해주세요"
                    value={formData.address}
                    validationMessage={validationMessages.address}
                    validationFallback="주소 검증 메시지"
                    showValidation={showValidation}
                    onChange={(value) => updateField("address", value)}
                />
            </div>

            <SignupSubmitButton>회원 가입 완료</SignupSubmitButton>

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
        </form>
    );
}
