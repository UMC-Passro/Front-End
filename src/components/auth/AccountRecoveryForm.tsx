import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";

type RecoveryType = "id" | "password";

interface AccountRecoveryFormProps {
    type: RecoveryType;
}

type RecoveryValues = {
    name: string;
    phone: string;
    email: string;
};

const recoveryConfig = {
    id: {
        title: "아이디 찾기",
        description: "회원가입 하셨던 아이디로 이메일로 보내드릴게요!",
        buttonLabel: "이메일 전송하기",
    },
    password: {
        title: "비밀번호 찾기",
        description: (
            <>
                회원가입 하셨던 아이디로 이메일로
                <br />
                임시 비밀번호를 보내드릴게요!
            </>
        ),
        buttonLabel: "임시 비밀번호 전송하기",
    },
} as const;

const inputClassName =
    "w-full rounded-[10px] bg-gray-50 px-5 py-[15px] text-[15px] font-medium leading-[22px] text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-purple-200";

export default function AccountRecoveryForm({
    type,
}: AccountRecoveryFormProps) {
    const navigate = useNavigate();
    const config = recoveryConfig[type];
    const [values, setValues] = useState<RecoveryValues>({
        name: "",
        phone: "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const updateValue = (key: keyof RecoveryValues, value: string) => {
        setValues((previous) => ({ ...previous, [key]: value }));
        setErrorMessage("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const hasEmptyField =
            type === "id"
                ? !values.name.trim() || !values.phone.trim()
                : !values.email.trim();

        if (hasEmptyField) {
            setErrorMessage("필수 정보를 모두 입력해 주세요.");
            return;
        }

        // TODO: 계정 복구 API가 추가되면 입력값을 전송합니다.
    };

    return (
        <main className="page-container flex min-h-[100dvh] flex-col">
            <PageHeader title={config.title} onBack={() => navigate(-1)} />

            <form
                className="flex min-h-0 flex-1 flex-col px-1 pt-12"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="space-y-6">
                    {type === "id" ? (
                        <>
                            <label className="block">
                                <span className="mb-1 block text-sm font-semibold leading-[22px] text-gray-700">
                                    이름
                                </span>
                                <input
                                    type="text"
                                    value={values.name}
                                    onChange={(event) =>
                                        updateValue("name", event.target.value)
                                    }
                                    placeholder="회원가입 시 작성했던 이름을 입력해주세요"
                                    className={inputClassName}
                                    autoComplete="name"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1 block text-sm font-semibold leading-[22px] text-gray-700">
                                    전화번호
                                </span>
                                <input
                                    type="tel"
                                    value={values.phone}
                                    onChange={(event) =>
                                        updateValue("phone", event.target.value)
                                    }
                                    placeholder="회원가입 시 작성했던 전화번호를 입력해주세요"
                                    className={inputClassName}
                                    autoComplete="tel"
                                    inputMode="tel"
                                />
                            </label>
                        </>
                    ) : (
                        <label className="block">
                            <span className="mb-1 block text-sm font-semibold leading-[22px] text-gray-700">
                                이메일
                            </span>
                            <input
                                type="email"
                                value={values.email}
                                onChange={(event) =>
                                    updateValue("email", event.target.value)
                                }
                                placeholder="이메일을 입력해주세요"
                                className={inputClassName}
                                autoComplete="email"
                                inputMode="email"
                            />
                        </label>
                    )}

                    {errorMessage ? (
                        <p className="text-xs font-semibold text-red-500" role="alert">
                            {errorMessage}
                        </p>
                    ) : null}
                </div>

                <div className="mt-auto pb-6 text-center">
                    <p className="mb-4 text-[13px] font-medium leading-[22px] text-purple-600">
                        {config.description}
                    </p>
                    <button
                        type="submit"
                        className="w-full rounded-[10px] bg-purple-500 px-2.5 py-3.5 text-base font-bold leading-[22px] text-white transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                    >
                        {config.buttonLabel}
                    </button>
                </div>
            </form>
        </main>
    );
}
