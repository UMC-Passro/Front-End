import ValidationMessage from "../common/ValidationMessage";
import { SIGNUP_LABEL_CLASS } from "../common/styles";
import { getEmailValidationMessage } from "../../../utils/signupValidation";
import type { SignupEmailVerificationStatus } from "../../../types/signup";
import { BASIC_ACTION_BUTTON_CLASS, BASIC_FIELD_CLASS } from "./constants";

type EmailFieldProps = {
    value: string;
    code: string;
    status: SignupEmailVerificationStatus;
    isSending: boolean;
    isConfirming: boolean;
    showValidation: boolean;
    onChange: (value: string) => void;
    onCodeChange: (value: string) => void;
    onRequest: () => void;
    onConfirm: () => void;
};

export default function EmailField({
    value,
    code,
    status,
    isSending,
    isConfirming,
    showValidation,
    onChange,
    onCodeChange,
    onRequest,
    onConfirm,
}: EmailFieldProps) {
    const isVerified = status === "verified";
    const validationMessage = getEmailValidationMessage(value, isVerified);
    const requestButtonClass = status === "idle"
        ? "rounded-lg bg-purple-600 px-3 py-4 text-[15px] text-white transition-colors hover:bg-[#918DFF]"
        : BASIC_ACTION_BUTTON_CLASS;

    return (
        <section className="flex flex-col gap-[10px]">
            <label className={SIGNUP_LABEL_CLASS} htmlFor="signup-email">
                아이디(이메일)
            </label>

            <div className="grid grid-cols-[1fr_127px] gap-[10px]">
                <input
                    id="signup-email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={value}
                    readOnly={status === "verified"}
                    onChange={(event) => onChange(event.target.value)}
                    className={
                        status === "verified" ? "w-full rounded-lg bg-gray-500 px-5 py-4 text-[15px] text-gray-200 outline-none" :
                            BASIC_FIELD_CLASS}
                />
                <button
                    type="button"
                    onClick={onRequest}
                    disabled={isSending || isVerified}
                    className={requestButtonClass}
                >
                    {isSending
                        ? "발송 중..."
                        : status === "sent"
                            ? "재전송"
                            : isVerified
                                ? "인증 완료"
                                : "인증 요청"}
                </button>
            </div>

            {status === "sent" ? (
                <div className="grid grid-cols-[1fr_127px] gap-[10px]">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="6자리 인증번호"
                        value={code}
                        disabled={isVerified}
                        onChange={(event) =>
                            onCodeChange(
                                event.target.value.replace(/\D/g, "").slice(0, 6),
                            )
                        }
                        className={BASIC_FIELD_CLASS}
                    />
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isConfirming || isVerified}
                        className={"rounded-lg bg-purple-600 px-3 py-4 text-[15px] text-white transition-colors hover:bg-[#918DFF]"}
                    >
                        {isConfirming
                            ? "확인 중..."
                            : isVerified
                                ? "인증 완료"
                                : "인증 확인"}
                    </button>
                </div>
            ) : null}

            <ValidationMessage
                message={
                    isVerified ? "이메일 인증이 완료되었습니다" : validationMessage
                }
                fallback="이메일 검증 메시지"
                colorClass={isVerified ? "text-[#24A148]" : "text-[#E5484D]"}
                visible={
                    isVerified ||
                    (showValidation && Boolean(validationMessage))
                }
            />
        </section>
    );
}
