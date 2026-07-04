import type { FormEvent } from "react";
import type { SignupFieldUpdater, SignupFormData } from "../../types/signup";

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
  const handleSendEmailCode = () => {
    // TODO: 인증번호 발송 API 요청을 연결합니다.
    console.log("인증번호 발송:", formData.email);
  };

  const handleVerifyEmailCode = () => {
    // TODO: 인증번호 확인 API 요청을 연결합니다.
    console.log("인증번호 확인:", formData.emailCode);
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
      <h2 className="font-bold text-xl text-gray-500">닉네임</h2>

      <div className="grid grid-cols-[1fr_96px] gap-4">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={(e) => updateField("nickname", e.target.value)}
          className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
        />

        <button
          type="button"
          className="w-full h-14 text-xs bg-gray-400 text-white rounded-lg font-semibold"
        >
          중복확인
        </button>
      </div>

      <hr className="w-full h-[2px] bg-gray-500 border-0 my-2" />

      <h2 className="font-bold text-xl text-gray-500">이메일</h2>

      <div className="grid grid-cols-[1fr_96px] gap-4">
        <input
          type="email"
          placeholder="ex) passro@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
        />

        <button
          type="button"
          onClick={handleSendEmailCode}
          className="w-full h-14 text-xs bg-gray-400 text-white rounded-lg font-semibold flex flex-col items-center justify-center leading-tight"
        >
          <span>인증번호</span>
          <span>발송</span>
        </button>
      </div>

      <div className="grid grid-cols-[1fr_96px] gap-4">
        <input
          type="text"
          placeholder="ex) 1234"
          value={formData.emailCode}
          onChange={(e) => updateField("emailCode", e.target.value)}
          className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
        />

        <button
          type="button"
          onClick={handleVerifyEmailCode}
          className="w-full h-14 text-xs bg-gray-400 text-white rounded-lg font-semibold"
        >
          인증확인
        </button>
      </div>

      <hr className="w-full h-[2px] bg-gray-500 border-0 my-2" />

      <h2 className="font-bold text-xl text-gray-500">비밀번호</h2>

      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChange={(e) => updateField("password", e.target.value)}
        className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
      />

      <h2 className="font-bold text-xl text-gray-500">비밀번호 확인</h2>

      <input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        value={formData.passwordCheck}
        onChange={(e) => updateField("passwordCheck", e.target.value)}
        className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
      />

      <hr className="w-full h-[2px] bg-gray-500 border-0 my-2" />

      <button
        type="submit"
        className="w-full h-14 bg-gray-700 text-white rounded-lg font-semibold"
      >
        다음
      </button>
    </form>
  );
}
