import { useState } from "react";

type VerificationStep = "intro" | "form" | "complete";

interface StudentVerificationModalProps {
    onComplete: () => void;
}

const modalClassName =
    "relative z-10 w-[calc(100%-40px)] max-w-[360px] rounded-[10px] bg-white";

export default function StudentVerificationModal({
    onComplete,
}: StudentVerificationModalProps) {
    const [step, setStep] = useState<VerificationStep>("intro");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeRequested, setIsCodeRequested] = useState(false);

    const handleRequestCode = () => {
        if (!email.trim()) {
            return;
        }

        setIsCodeRequested(true);
    };

    const handleVerify = () => {
        if (!verificationCode.trim()) {
            return;
        }

        setStep("complete");
    };

    return (
        <div
            className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-[402px] -translate-x-1/2 items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`student-verification-${step}-title`}
        >
            {step === "intro" ? (
                <section
                    className={`${modalClassName} flex flex-col items-center gap-[25px] px-[10px] pb-[22px] pt-[27px] text-center`}
                >
                    <div className="flex flex-col items-center gap-[10px]">
                        <h2
                            id="student-verification-intro-title"
                            className="text-[18px] font-semibold leading-[25px] text-gray-900"
                        >
                            물건을 전달하려면
                            <br />
                            학생 인증이 필요해요!
                        </h2>
                        <p className="text-[13px] font-medium text-gray-400">
                            학교 이메일을 통해 인증할 수 있어요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setStep("form")}
                        className="flex h-[51px] w-full max-w-[320px] items-center justify-center rounded-[10px] bg-purple-500 px-[10px] py-[14px] text-[16px] font-bold leading-[22px] text-white"
                    >
                        인증하기
                    </button>
                </section>
            ) : null}

            {step === "form" ? (
                <section
                    className={`${modalClassName} flex flex-col gap-[10px] px-[22px] py-[25px]`}
                >
                    <h2 id="student-verification-form-title" className="sr-only">
                        학생 이메일 인증
                    </h2>

                    <div className="flex items-end gap-2">
                        <label className="flex min-w-0 flex-1 flex-col gap-[10px]">
                            <span className="text-[14px] font-semibold leading-[22px] text-gray-700">
                                아이디(이메일)
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="이메일을 입력해주세요"
                                className="h-[52px] min-w-0 rounded-[10px] bg-gray-50 px-5 text-[15px] font-medium text-gray-800 outline-none placeholder:text-gray-500"
                                autoComplete="email"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleRequestCode}
                            disabled={!email.trim()}
                            className="flex h-[52px] w-[90px] shrink-0 items-center justify-center rounded-[10px] bg-gray-200 text-[15px] font-medium leading-[22px] text-gray-700 disabled:cursor-not-allowed"
                        >
                            인증 요청
                        </button>
                    </div>

                    <div className="flex items-end gap-2">
                        <label className="flex min-w-0 flex-1 flex-col gap-[10px]">
                            <span className="text-[14px] font-semibold leading-[22px] text-gray-700">
                                인증번호
                            </span>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(event) =>
                                    setVerificationCode(event.target.value)
                                }
                                placeholder="인증번호를 입력해주세요"
                                className="h-[52px] min-w-0 rounded-[10px] bg-gray-50 px-5 text-[15px] font-medium text-gray-800 outline-none placeholder:text-gray-500"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleVerify}
                            disabled={!verificationCode.trim()}
                            className="flex h-[52px] w-[90px] shrink-0 items-center justify-center rounded-[10px] bg-gray-200 text-[15px] font-medium leading-[22px] text-gray-700 disabled:cursor-not-allowed"
                        >
                            확인
                        </button>
                    </div>

                    {isCodeRequested ? (
                        <p className="sr-only" role="status">
                            인증번호가 요청되었습니다.
                        </p>
                    ) : null}
                </section>
            ) : null}

            {step === "complete" ? (
                <section
                    className={`${modalClassName} flex flex-col items-center gap-[25px] px-[10px] pb-[22px] pt-[27px] text-center`}
                >
                    <div className="flex flex-col items-center gap-[10px]">
                        <h2
                            id="student-verification-complete-title"
                            className="text-[18px] font-semibold leading-[25px] text-gray-900"
                        >
                            인증되었어요!
                        </h2>
                        <p className="text-[13px] font-medium text-gray-400">
                            이제 패스로 활동할 수 있어요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onComplete}
                        className="flex h-[51px] w-full max-w-[320px] items-center justify-center rounded-[10px] bg-purple-500 px-[10px] py-[14px] text-[16px] font-bold leading-[22px] text-white"
                    >
                        확인
                    </button>
                </section>
            ) : null}
        </div>
    );
}
