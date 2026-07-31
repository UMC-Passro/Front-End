import { useState, type FormEvent } from "react";
import type {
  SignupEmailVerificationStatus,
  SignupFieldUpdater,
  SignupFormData,
  SignupNicknameCheckStatus,
} from "../../../types/signup";
import {
  getEmailValidationMessage,
  getPasswordValidation,
  isEmailValid,
} from "../../../utils/signupValidation";
import { authApi } from "../../../apis/authApi";
import { ApiError } from "../../../types/api";
import FeedbackModal from "../common/FeedbackModal";
import SignupSubmitButton from "../common/SignupSubmitButton";
import EmailField from "./EmailField";
import NicknameField from "./NicknameField";
import PasswordFields from "./PasswordFields";

type BasicSignupFormProps = {
  formData: SignupFormData;
  updateField: SignupFieldUpdater;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  emailVerificationStatus: SignupEmailVerificationStatus;
  onEmailVerificationStatusChange: (
    status: SignupEmailVerificationStatus,
  ) => void;
};

export default function BasicSignupForm({
  formData,
  updateField,
  onSubmit,
  emailVerificationStatus,
  onEmailVerificationStatusChange,
}: BasicSignupFormProps) {
  const [showValidation, setShowValidation] = useState(false);
  const [emailAction, setEmailAction] = useState<"send" | "confirm" | null>(
    null,
  );
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<SignupNicknameCheckStatus>("idle");
  const [modalMessage, setModalMessage] = useState("");

  const handleEmailChange = (value: string) => {
    updateField("email", value);
    updateField("emailCode", "");
    onEmailVerificationStatusChange("idle");
  };

  const handleEmailRequest = async () => {
    if (!isEmailValid(formData.email)) {
      setShowValidation(true);
      return;
    }

    setEmailAction("send");
    setModalMessage("");

    try {
      await authApi.sendMail({
        mail: formData.email.trim(),
        student: false,
      });
      onEmailVerificationStatusChange("sent");
      setModalMessage("인증번호를 이메일로 발송했습니다.");
    } catch (error) {
      setModalMessage(
        error instanceof ApiError
          ? error.message
          : "인증 메일 발송 중 오류가 발생했습니다.",
      );
    } finally {
      setEmailAction(null);
    }
  };

  const handleEmailConfirm = async () => {
    if (!/^\d{6}$/.test(formData.emailCode)) {
      setModalMessage("6자리 인증번호를 입력해주세요.");
      return;
    }

    setEmailAction("confirm");
    setModalMessage("");

    try {
      await authApi.confirmMail({
        mail: formData.email.trim(),
        code: formData.emailCode,
      });
      onEmailVerificationStatusChange("verified");
      setModalMessage("이메일 인증이 완료되었습니다.");
    } catch (error) {
      setModalMessage(
        error instanceof ApiError
          ? error.message
          : "인증번호 확인 중 오류가 발생했습니다.",
      );
    } finally {
      setEmailAction(null);
    }
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

    setNicknameCheckStatus("available");
    setModalMessage(
      "최종 회원가입 단계에서 닉네임 중복 여부를 확인합니다.",
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);

    const isFormValid =
      !getEmailValidationMessage(
        formData.email,
        emailVerificationStatus === "verified",
      ) &&
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
          code={formData.emailCode}
          status={emailVerificationStatus}
          isSending={emailAction === "send"}
          isConfirming={emailAction === "confirm"}
          showValidation={showValidation}
          onChange={handleEmailChange}
          onCodeChange={(value) => updateField("emailCode", value)}
          onRequest={handleEmailRequest}
          onConfirm={handleEmailConfirm}
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

      <div className="fixed bottom-[15px] w-[100%]" style={{ "maxWidth": "min(361px, calc(100% - 42px))" }}>
        <SignupSubmitButton>다음</SignupSubmitButton>
      </div>
      <FeedbackModal
        message={modalMessage}
        onClose={() => setModalMessage("")}
      />
    </form>
  );
}
