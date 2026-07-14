import { useState, type FormEvent } from "react";
import type { SignupFieldUpdater, SignupFormData } from "../../types/signup";

const MOCK_DUPLICATE_NICKNAMES = ["passro", "admin", "test", "중복", "김자취러김"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NicknameCheckStatus = "idle" | "available" | "duplicate";

type BasicSignupFormProps = {
  formData: SignupFormData;
  updateField: SignupFieldUpdater;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function BasicSignupForm({
  formData,
  updateField,
  onSubmit,
}: BasicSignupFormProps) {
  const [showValidation, setShowValidation] = useState(false);
  const [isEmailRequested, setIsEmailRequested] = useState(false);
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<NicknameCheckStatus>("idle");
  const [modalMessage, setModalMessage] = useState("");

  const passwordCategoryCount = [
    /[A-Z]/.test(formData.password),
    /[a-z]/.test(formData.password),
    /\d/.test(formData.password),
    /[^A-Za-z0-9]/.test(formData.password),
  ].filter(Boolean).length;

  const isPasswordLengthValid =
    formData.password.length >= 6 && formData.password.length <= 20;
  const isPasswordValid = isPasswordLengthValid && passwordCategoryCount >= 2;
  const passwordGuideColor = isPasswordValid ? "text-[#24A148]" : "text-[#E5484D]";
  const isPasswordCheckValid =
    formData.passwordCheck.length > 0 && formData.password === formData.passwordCheck;
  const passwordCheckMessage = isPasswordCheckValid
    ? "비밀번호가 일치합니다"
    : "비밀번호가 일치하는지 확인해주세요";
  const passwordCheckColor = isPasswordCheckValid ? "text-[#24A148]" : "text-[#E5484D]";

  const fieldClass =
    "h-[58px] w-full rounded-[10px] bg-[#F8F9FD] px-[22px] text-[16px] font-medium leading-[22px] text-[#373840] outline-none placeholder:text-[#9EA2B3]";
  const actionButtonClass =
    "h-[58px] rounded-[10px] bg-[#D8DAE6] px-3 text-[16px] font-semibold leading-[22px] text-[#4E505A] transition-colors hover:bg-[#E4E6F0]";
  const emailRequestButtonClass = isEmailRequested
    ? "h-[58px] rounded-[10px] bg-[#8581F6] px-3 text-[16px] font-semibold leading-[22px] text-white transition-colors hover:bg-[#918DFF]"
    : actionButtonClass;
  const labelClass = "text-[15px] font-bold leading-[22px] text-[#51525C]";
  const validationBaseClass = "pl-1 text-[12px] font-medium leading-[18px]";
  const primaryButtonClass =
    "mt-auto h-[54px] w-full rounded-[9px] bg-[#7470F4] text-[18px] font-extrabold leading-[22px] text-white transition-colors hover:bg-[#8581F6]";
  const trimmedEmail = formData.email.trim();
  const isEmailFormatValid = EMAIL_PATTERN.test(trimmedEmail);

  const emailValidationMessage = !trimmedEmail
    ? "이메일을 입력해주세요"
    : !isEmailFormatValid
      ? "올바른 이메일 형식으로 입력해주세요"
    : !isEmailRequested
      ? "인증 요청을 진행해주세요"
      : "";
  const nicknameValidationMessage = (() => {
    if (!formData.nickname.trim()) {
      return { message: "닉네임을 입력해주세요", color: "text-[#E5484D]" };
    }

    if (nicknameCheckStatus === "available") {
      return { message: "사용 가능한 닉네임입니다", color: "text-[#24A148]" };
    }

    if (nicknameCheckStatus === "duplicate") {
      return { message: "같은 닉네임이 존재합니다", color: "text-[#E5484D]" };
    }

    return { message: "닉네임 중복 확인을 진행해주세요", color: "text-[#E5484D]" };
  })();

  const shouldShowEmailValidation = showValidation && Boolean(emailValidationMessage);
  const shouldShowNicknameValidation =
    showValidation || nicknameCheckStatus !== "idle";

  const handleEmailChange = (value: string) => {
    updateField("email", value);
    setIsEmailRequested(false);
  };

  const handleNicknameChange = (value: string) => {
    updateField("nickname", value);
    setNicknameCheckStatus("idle");
  };

  const handleEmailRequest = () => {
    if (!trimmedEmail || !isEmailFormatValid) {
      setShowValidation(true);
      return;
    }

    setIsEmailRequested(true);
  };

  const handleNicknameCheck = () => {
    const nickname = formData.nickname.trim();

    if (!nickname) {
      setShowValidation(true);
      setNicknameCheckStatus("idle");
      setModalMessage("닉네임을 입력해주세요.");
      return;
    }

    const isDuplicate = MOCK_DUPLICATE_NICKNAMES.some(
      (item) => item.toLowerCase() === nickname.toLowerCase(),
    );

    setNicknameCheckStatus(isDuplicate ? "duplicate" : "available");
    setModalMessage(
      isDuplicate ? "같은 닉네임이 존재합니다." : "사용 가능한 닉네임입니다.",
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);

    if (
      emailValidationMessage ||
      !isPasswordValid ||
      !isPasswordCheckValid ||
      nicknameCheckStatus !== "available"
    ) {
      return;
    }

    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-[27px]">
        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-email">
            아이디(이메일)
          </label>

          <div className="grid grid-cols-[1fr_127px] gap-[10px]">
            <input
              id="signup-email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={fieldClass}
            />

            <button
              type="button"
              onClick={handleEmailRequest}
              className={emailRequestButtonClass}
            >
              인증 요청
            </button>
          </div>

          <p
            className={`${validationBaseClass} text-[#E5484D] ${
              shouldShowEmailValidation ? "" : "invisible"
            }`}
          >
            {emailValidationMessage || "이메일 검증 메시지"}
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-password">
            비밀번호
          </label>

          <input
            id="signup-password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={fieldClass}
          />

          <p
            className={`pl-1 text-[11px] font-medium leading-[18px] min-[390px]:whitespace-nowrap min-[390px]:text-[12px] ${passwordGuideColor}`}
            aria-live="polite"
          >
            6~20자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-password-check">
            비밀번호 확인
          </label>

          <input
            id="signup-password-check"
            type="password"
            placeholder="비밀번호를 확인해주세요"
            value={formData.passwordCheck}
            onChange={(e) => updateField("passwordCheck", e.target.value)}
            className={fieldClass}
          />

          <p
            className={`${validationBaseClass} ${passwordCheckColor}`}
            aria-live="polite"
          >
            {passwordCheckMessage}
          </p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <label className={labelClass} htmlFor="signup-nickname">
            닉네임
          </label>

          <div className="grid grid-cols-[1fr_127px] gap-[10px]">
            <input
              id="signup-nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={formData.nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              className={fieldClass}
            />

            <button
              type="button"
              onClick={handleNicknameCheck}
              className={actionButtonClass}
            >
              중복 확인
            </button>
          </div>

          <p
            className={`${validationBaseClass} ${nicknameValidationMessage.color} ${
              shouldShowNicknameValidation ? "" : "invisible"
            }`}
          >
            {nicknameValidationMessage.message}
          </p>
        </section>
      </div>

      <button
        type="submit"
        className={primaryButtonClass}
      >
        다음
      </button>

      {modalMessage ? (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 px-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalMessage("")}
        >
          <div
            className="w-full rounded-[14px] bg-white px-5 py-6 text-center shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[16px] font-bold leading-[24px] text-[#202126]">
              {modalMessage}
            </p>
            <button
              type="button"
              onClick={() => setModalMessage("")}
              className="mt-5 h-11 w-full rounded-[9px] bg-[#7470F4] text-[15px] font-bold text-white transition-colors hover:bg-[#8581F6]"
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
