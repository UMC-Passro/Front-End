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
    <div className="page-container flex flex-col items-center justify-center bg-white px-8 py-16">
      <img
        className="h-[clamp(200px,29dvh,250px)] w-[clamp(200px,29dvh,250px)] shrink-0 object-contain"
        src="/Logo.png"
        alt="Logo"
        width={250}
        height={250}
      />

      <div className="mt-6 flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={() => setSelectedType("sender")}
          className={`shadow-[2px_2px_rgba(0,0,0,0.10)] w-full rounded-lg p-4 font-semibold transition-colors ${
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
      </div>

      <button
        type="button"
        disabled={selectedType === null}
        onClick={handleHome}
        className={`shadow-[2px_2px_rgba(0,0,0,0.10)] mt-[clamp(3rem,10dvh,5.5rem)] w-full rounded-lg p-3 font-semibold transition-colors ${
          selectedType
            ? "cursor-pointer bg-purple-600 text-white hover:bg-purple-500"
            : "cursor-not-allowed bg-gray-100 text-gray-400"
        }`}
      >
        패스로 시작하기
      </button>
    </div>
  );
}
