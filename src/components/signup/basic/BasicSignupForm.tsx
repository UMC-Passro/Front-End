import { useState, type FormEvent } from "react";
import type {
  SignupFieldUpdater,
  SignupFormData,
  SignupNicknameCheckStatus,
} from "../../../types/signup";
import {
  getEmailValidationMessage,
  getPasswordValidation,
  isDuplicateNickname,
  isEmailValid,
} from "../../../utils/signupValidation";
import FeedbackModal from "../common/FeedbackModal";
import SignupSubmitButton from "../common/SignupSubmitButton";
import EmailField from "./EmailField";
import NicknameField from "./NicknameField";
import PasswordFields from "./PasswordFields";

type BasicSignupFormProps = {
  formData: SignupFormData;
  updateField: SignupFieldUpdater;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function BasicSignupForm({
  formData,
  updateField,
  onSubmit,
}: BasicSignupFormProps) {
  const [showValidation, setShowValidation] = useState(false);
  const [isEmailRequested, setIsEmailRequested] = useState(false);
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<SignupNicknameCheckStatus>("idle");
  const [modalMessage, setModalMessage] = useState("");

  const handleEmailChange = (value: string) => {
    updateField("email", value);
    setIsEmailRequested(false);
  };

  const handleEmailRequest = () => {
    if (!isEmailValid(formData.email)) {
      setShowValidation(true);
      return;
    }

    setIsEmailRequested(true);
  };

  const handleNicknameChange = (value: string) => {
    updateField("nickname", value);
    setNicknameCheckStatus("idle");
  };

  const handleNicknameCheck = () => {
    const nickname = formData.nickname.trim();

    if (!nickname) {
      setShowValidation(true);
      setNicknameCheckStatus("idle");
      setModalMessage("닉네임을 입력해주세요.");
      return;
    }

    const isDuplicate = isDuplicateNickname(nickname);
    setNicknameCheckStatus(isDuplicate ? "duplicate" : "available");
    setModalMessage(
      isDuplicate ? "같은 닉네임이 존재합니다." : "사용 가능한 닉네임입니다.",
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);

    const isFormValid =
      !getEmailValidationMessage(formData.email, isEmailRequested) &&
      getPasswordValidation(formData.password) &&
      formData.passwordCheck.length > 0 &&
      formData.password === formData.passwordCheck &&
      nicknameCheckStatus === "available";

    if (!isFormValid) {
      return;
    }

    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-[27px]">
        <EmailField
          value={formData.email}
          isRequested={isEmailRequested}
          showValidation={showValidation}
          onChange={handleEmailChange}
          onRequest={handleEmailRequest}
        />
        <PasswordFields
          password={formData.password}
          passwordCheck={formData.passwordCheck}
          onPasswordChange={(value) => updateField("password", value)}
          onPasswordCheckChange={(value) => updateField("passwordCheck", value)}
        />
        <NicknameField
          value={formData.nickname}
          status={nicknameCheckStatus}
          showValidation={showValidation}
          onChange={handleNicknameChange}
          onCheck={handleNicknameCheck}
        />
      </div>

      <SignupSubmitButton>다음</SignupSubmitButton>
      <FeedbackModal
        message={modalMessage}
        onClose={() => setModalMessage("")}
      />
    </form>
  );
}
