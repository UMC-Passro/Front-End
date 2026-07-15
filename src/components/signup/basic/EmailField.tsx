import ValidationMessage from "../common/ValidationMessage";
import { SIGNUP_LABEL_CLASS } from "../common/styles";
import { getEmailValidationMessage } from "../../../utils/signupValidation";
import { BASIC_ACTION_BUTTON_CLASS, BASIC_FIELD_CLASS } from "./constants";

type EmailFieldProps = {
  value: string;
  isRequested: boolean;
  showValidation: boolean;
  onChange: (value: string) => void;
  onRequest: () => void;
};

export default function EmailField({
  value,
  isRequested,
  showValidation,
  onChange,
  onRequest,
}: EmailFieldProps) {
  const validationMessage = getEmailValidationMessage(value, isRequested);
  const requestButtonClass = isRequested
    ? "h-[58px] rounded-[10px] bg-purple-600 px-3 text-[16px] font-semibold leading-[22px] text-white transition-colors hover:bg-[#918DFF]"
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
          onChange={(event) => onChange(event.target.value)}
          className={BASIC_FIELD_CLASS}
        />
        <button type="button" onClick={onRequest} className={requestButtonClass}>
          인증 요청
        </button>
      </div>

      <ValidationMessage
        message={validationMessage}
        fallback="이메일 검증 메시지"
        visible={showValidation && Boolean(validationMessage)}
      />
    </section>
  );
}
