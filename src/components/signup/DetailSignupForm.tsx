import type { FormEvent } from "react";
import type { SignupFieldUpdater, SignupFormData } from "../../types/signup";

type DetailSignupFormProps = {
  formData: SignupFormData;
  updateField: SignupFieldUpdater;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onPrev: () => void;
};

export default function DetailSignupForm({
  formData,
  updateField,
  onSubmit,
  onPrev,
}: DetailSignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
      <h2 className="font-bold text-xl text-gray-500">이름</h2>

      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
      />

      <h2 className="font-bold text-xl text-gray-500">전화번호</h2>

      <input
        type="tel"
        placeholder="전화번호를 입력해주세요"
        value={formData.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
      />

      <h2 className="font-bold text-xl text-gray-500">성별 선택</h2>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => updateField("gender", "M")}
          className={`h-12 rounded-lg font-semibold ${
            formData.gender === "M"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-500 border border-gray-400"
          }`}
        >
          남성
        </button>

        <button
          type="button"
          onClick={() => updateField("gender", "W")}
          className={`h-12 rounded-lg font-semibold ${
            formData.gender === "W"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-500 border border-gray-400"
          }`}
        >
          여성
        </button>

        <button
          type="button"
          onClick={() => updateField("gender", "NONE")}
          className={`h-12 rounded-lg font-semibold ${
            formData.gender === "NONE"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-500 border border-gray-400"
          }`}
        >
          선택 안 함
        </button>
      </div>

      <h2 className="font-bold text-xl text-gray-500">주소</h2>

      <input
        type="text"
        placeholder="주소를 입력해주세요"
        value={formData.address}
        onChange={(e) => updateField("address", e.target.value)}
        className="w-full h-14 border border-gray-400 rounded-md px-4 outline-none"
      />

      <hr className="w-full h-[2px] bg-gray-500 border-0 my-2" />

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="w-full h-14 bg-gray-400 text-white rounded-lg font-semibold"
        >
          이전
        </button>

        <button
          type="submit"
          className="w-full h-14 bg-gray-700 text-white rounded-lg font-semibold"
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
}
