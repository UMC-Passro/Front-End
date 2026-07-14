import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../types/user";
import { setCurrentUserRole } from "../utils/auth";

export default function UserStateChoice() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserRole | null>(null);

  const handleHome = () => {
    if (!selectedType) {
      return;
    }

    setCurrentUserRole(selectedType);
    navigate("/home");
  };

  return (
    <div className="page-container relative flex flex-col items-center justify-center gap-3 bg-white px-8 py-16">
      <img
        className="absolute left-1/2 top-[300px] -translate-x-1/2"
        src="/Logo.png"
        alt="Logo"
        width={250}
        height={250}
      />

      <button
        type="button"
        onClick={() => setSelectedType("sender")}
        className={`shadow-[2px_2px_rgba(0,0,0,0.10)] mt-[330px] w-full rounded-lg p-4 font-semibold transition-colors ${
          selectedType === "sender"
            ? "bg-gray-400 text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        물건을 보내고 싶어요
      </button>
      <button
        type="button"
        onClick={() => setSelectedType("carrier")}
        className={`shadow-[2px_2px_rgba(0,0,0,0.10)] w-full rounded-lg p-4 font-semibold transition-colors ${
          selectedType === "carrier"
            ? "bg-gray-400 text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        물건을 전달하고 싶어요
      </button>

      <button
        type="button"
        disabled={selectedType === null}
        onClick={handleHome}
        className={`shadow-[2px_2px_rgba(0,0,0,0.10)] mt-[180px] w-full rounded-lg p-3 font-semibold transition-colors ${
          selectedType
            ? "cursor-pointer bg-[#6E73F5] text-white hover:bg-[#8589F7]"
            : "cursor-not-allowed bg-gray-100 text-gray-400"
        }`}
      >
        패스로 시작하기
      </button>
    </div>
  );
}
