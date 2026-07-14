import { useState, type FormEvent } from "react";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import type { SignupFieldUpdater, SignupFormData } from "../../types/signup";
import DatePickerSheet from "./DatePickerSheet";

type DetailSignupFormProps = {
  formData: SignupFormData;
  updateField: SignupFieldUpdater;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function formatBirthDate(value: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  return `${year}.${month}.${day}`;
}

function formatPhoneNumber(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.startsWith("02")) {
    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    }

    if (numbers.length <= 9) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    }

    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  }

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export default function DetailSignupForm({
  formData,
  updateField,
  onSubmit,
}: DetailSignupFormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const labelClass = "text-[15px] font-bold leading-[22px] text-[#51525C]";
  const fieldClass =
    "h-[58px] w-full rounded-[10px] bg-[#F8F9FD] px-[18px] text-left text-[16px] font-medium leading-[22px] text-[#373840] outline-none placeholder:text-[#9EA2B3]";
  const validationTextClass =
    "pl-1 text-[12px] font-medium leading-[18px] text-[#E5484D]";
  const primaryButtonClass =
    "mt-auto h-[54px] w-full rounded-[9px] bg-[#7470F4] text-[18px] font-extrabold leading-[22px] text-white transition-colors hover:bg-[#8581F6]";

  const isPhoneValid = /^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone);
  const nameValidationMessage = formData.name.trim() ? "" : "이름을 입력해주세요";
  const phoneValidationMessage = !formData.phone
    ? "전화번호를 입력해주세요"
    : !isPhoneValid
      ? "전화번호 형식을 확인해주세요"
      : "";
  const birthDateValidationMessage = formData.birthDate
    ? ""
    : "생년월일을 선택해주세요";
  const addressValidationMessage = formData.address.trim()
    ? ""
    : "주소를 입력해주세요";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);

    if (
      nameValidationMessage ||
      phoneValidationMessage ||
      birthDateValidationMessage ||
      addressValidationMessage
    ) {
      return;
    }

    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-[27px]">
        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-name">
            이름
          </label>

          <input
            id="signup-name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={fieldClass}
          />

          <p
            className={`${validationTextClass} ${
              showValidation && nameValidationMessage ? "" : "invisible"
            }`}
          >
            {nameValidationMessage || "이름 검증 메시지"}
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-phone">
            전화번호
          </label>

          <input
            id="signup-phone"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            value={formData.phone}
            onChange={(e) => updateField("phone", formatPhoneNumber(e.target.value))}
            className={fieldClass}
          />

          <p
            className={`${validationTextClass} ${
              showValidation && phoneValidationMessage ? "" : "invisible"
            }`}
          >
            {phoneValidationMessage || "전화번호 검증 메시지"}
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <span className={labelClass}>생년월일</span>

          <button
            type="button"
            onClick={() => setIsDatePickerOpen(true)}
            className={`${fieldClass} flex items-center justify-between leading-none`}
            aria-label="생년월일 선택"
          >
            <span
              className={`flex h-full items-center ${
                formData.birthDate ? "text-[#373840]" : "text-[#9EA2B3]"
              }`}
            >
              {formData.birthDate
                ? formatBirthDate(formData.birthDate)
                : "생년월일을 입력해주세요"}
            </span>
            <span className="text-[#AEB2C0]">
              <CalendarIcon />
            </span>
          </button>

          <p
            className={`${validationTextClass} ${
              showValidation && birthDateValidationMessage ? "" : "invisible"
            }`}
          >
            {birthDateValidationMessage || "생년월일 검증 메시지"}
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-address">
            주소
          </label>

          <input
            id="signup-address"
            type="text"
            placeholder="주소를 입력해주세요"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            className={fieldClass}
          />

          <p
            className={`${validationTextClass} ${
              showValidation && addressValidationMessage ? "" : "invisible"
            }`}
          >
            {addressValidationMessage || "주소 검증 메시지"}
          </p>
        </section>
      </div>

      <button
        type="submit"
        className={primaryButtonClass}
      >
        회원 가입 완료
      </button>

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
