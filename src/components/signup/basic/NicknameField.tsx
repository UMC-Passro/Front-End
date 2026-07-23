import type { SignupNicknameCheckStatus } from "../../../types/signup";
import { getNicknameValidation } from "../../../utils/signupValidation";
import ValidationMessage from "../common/ValidationMessage";
import { SIGNUP_LABEL_CLASS } from "../common/styles";
import { BASIC_ACTION_BUTTON_CLASS, BASIC_FIELD_CLASS } from "./constants";

type NicknameFieldProps = {
  value: string;
  status: SignupNicknameCheckStatus;
  showValidation: boolean;
  onChange: (value: string) => void;
  onCheck: () => void;
};

export default function NicknameField({
  value,
  status,
  showValidation,
  onChange,
  onCheck,
}: NicknameFieldProps) {
  const validation = getNicknameValidation(value, status);

  return (
    <section className="flex flex-col gap-[10px]">
      <label className={SIGNUP_LABEL_CLASS} htmlFor="signup-nickname">
        닉네임
      </label>
      <div className="grid grid-cols-[1fr_127px] gap-[10px]">
        <input
          id="signup-nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={BASIC_FIELD_CLASS}
        />
        <button type="button" onClick={onCheck} className={BASIC_ACTION_BUTTON_CLASS}>
          중복 확인
        </button>
      </div>
      <ValidationMessage
        message={validation.message}
        fallback=""
        colorClass={validation.color}
        visible={showValidation || status !== "idle"}
      />
    </section>
  );
}
