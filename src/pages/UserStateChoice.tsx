import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentVerificationModal from "../components/verification/StudentVerificationModal";
import type { UserRole } from "../types/user";
import { setCurrentUserRole } from "../utils/auth";

export default function UserStateChoice() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<UserRole | null>(null);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const handleHome = () => {
        if (!selectedType) {
            return;
        }

        if (selectedType === "carrier") {
            setIsVerificationOpen(true);
            return;
        }

        setCurrentUserRole(selectedType);
        navigate("/home");
    };

    const handleVerificationComplete = () => {
        setCurrentUserRole("carrier");
        navigate("/home");
    };

    return (
        <>
            <div className="page-container flex flex-col items-center justify-center">
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
                        className={`shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.1)] w-full rounded-lg p-5 transition-colors ${selectedType === "sender"
                            ? "bg-gray-500 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        물건을 보내고 싶어요!
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedType("carrier")}
                        className={`shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.1)] w-full rounded-lg p-5 transition-colors ${selectedType === "carrier"
                            ? "bg-gray-500 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        물건을 전달하고 싶어요!
                    </button>
                </div>

                <button
                    type="button"
                    disabled={selectedType === null}
                    onClick={handleHome}
                    className={`mt-10 w-full shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-3.5 font-semibold transition-colors ${selectedType
                        ? "cursor-pointer bg-purple-500 text-white hover:bg-purple-600"
                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                >
                    패스로 시작하기
                </button>
            </div>

            {isVerificationOpen ? (
                <StudentVerificationModal
                    onComplete={handleVerificationComplete}
                />
            ) : null}
        </>
    );
}
