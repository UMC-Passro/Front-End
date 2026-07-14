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
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-2">
      <div className="h-[874px] w-[402px] bg-white border border-black py-16 px-8 flex flex-col items-center justify-center gap-3">
        <img
          className="absolute top-[300px]"
          src="/Logo.png"
          alt="Logo"
          width={250}
          height={250}
        />

        <button
          type="button"
          onClick={() => setSelectedType("sender")}
          className={`shadow-[2px_2px_rgba(0,0,0,0.10)] w-full font-semibold p-4 rounded-lg mt-[330px] transition-colors ${
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
          className={`shadow-[2px_2px_rgba(0,0,0,0.10)] w-full font-semibold p-4 rounded-lg transition-colors ${
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
          className={`shadow-[2px_2px_rgba(0,0,0,0.10)] w-full font-semibold p-3 mt-[180px] rounded-lg transition-colors ${
            selectedType
              ? "bg-[#6E73F5] text-white hover:bg-[#8589F7] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          패스로 시작하기
        </button>
      </div>
    </div>
  );
}
