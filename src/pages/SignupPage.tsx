import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicSignupForm from "../components/signup/BasicSignupForm";
import DetailSignupForm from "../components/signup/DetailSignupForm";
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

    return (
        <div className="page-container flex flex-col items-center gap-6">
            <h1 className="text-7xl text-gray-500 font-bold mb-10">Passro</h1>

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
                    onPrev={() => setStep("basic")}
                />
            )}
        </div>
    );
}
