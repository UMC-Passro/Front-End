import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronIcon from "../assets/icons/ChevronIcon";
import {
    BasicSignupForm,
    DetailSignupForm,
} from "../components/signup";
import type {
    SignupFieldUpdater,
    SignupFormData,
    SignupStep,
} from "../types/signup";

const initialSignupFormData: SignupFormData = {
    nickname: "",
    email: "",
    emailCode: "",
    password: "",
    passwordCheck: "",
    name: "",
    phone: "",
    birthDate: "",
    gender: "NONE",
    address: "",
};

export default function SignupPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<SignupStep>("basic");
    const [formData, setFormData] = useState<SignupFormData>(
        initialSignupFormData,
    );

    const updateField: SignupFieldUpdater = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleBasicSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: 닉네임 중복 확인, 이메일 인증 확인, 비밀번호 일치 검증을 연결합니다.
        setStep("detail");
    };

    const handleFinalSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: 최종 회원가입 API 요청을 연결합니다.
        console.log("회원가입 데이터", formData);

        navigate("/login");
    };

    const handleBack = () => {
        if (step === "basic") {
            navigate(-1);
            return;
        }

        setStep("basic");
    };

    return (
        <div className="page-container relative flex flex-col overflow-hidden bg-white px-5 pb-2.5 pt-2.5">
            <header className="relative mb-[38px] flex h-8 items-center justify-center">
                <button
                    type="button"
                    onClick={handleBack}
                    className="absolute left-0 flex h-8 w-8 items-center justify-center text-[#8E91A1]"
                    aria-label="이전 페이지로 이동"
                >
                    <ChevronIcon />
                </button>
                <h1 className="text-[25px] font-extrabold leading-8 text-[#202126]">
                    {step === "basic" ? "회원가입" : "상세정보"}
                </h1>
            </header>

            {step === "basic" ? (
                <BasicSignupForm
                    formData={formData}
                    updateField={updateField}
                    onSubmit={handleBasicSubmit}
                />
            ) : (
                <DetailSignupForm
                    formData={formData}
                    updateField={updateField}
                    onSubmit={handleFinalSubmit}
                />
            )}
        </div>
    );
}
