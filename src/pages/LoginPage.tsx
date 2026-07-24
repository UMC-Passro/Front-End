import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

type LoginLocationState = {
    from?: {
        pathname?: string;
    };
};

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const state = location.state as LoginLocationState | null;
    const from = state?.from?.pathname ?? "/user-state-choice";

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
            return;
        }

        login(email);
        navigate(from, { replace: true });
    };

    return (
        <div className="page-container flex flex-col items-center justify-center gap-6">
            <img
                className="h-[clamp(200px,29dvh,250px)] w-[clamp(200px,29dvh,250px)] shrink-0 object-contain"
                src="/Logo.png"
                alt="Logo"
                width={250}
                height={250}
            />

            <form
                className="w-full flex flex-col gap-2.5"
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    placeholder="아이디를 입력해 주세요"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="shadow-[2px_2px_rgba(0,0,0,0.10)] w-full text-sm bg-gray-50 rounded-lg px-5 py-4 outline-none placeholder:text-gray-400 placeholder:font-semibold"
                    aria-label="아이디"
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="shadow-[2px_2px_rgba(0,0,0,0.10)] w-full text-sm bg-gray-50 rounded-lg px-5 py-4 outline-none mb-5 placeholder:text-gray-400 placeholder:font-semibold"
                    aria-label="비밀번호"
                    autoComplete="current-password"
                />

                {errorMessage ? (
                    <p
                        className="-mt-3 text-sm font-semibold text-red-700"
                        role="alert"
                    >
                        {errorMessage}
                    </p>
                ) : null}

                <button
                    type="submit"
                    className="shadow-[2px_2px_rgba(0,0,0,0.10)] w-full bg-purple-500 text-white rounded-lg py-4 font-bold"
                >
                    로그인
                </button>
            </form>

            <div className="flex items-center justify-center gap-3 mt-4 text-sm text-gray-600">
                <Link
                    to="/find-pwd"
                    className="hover:text-gray-900 hover:underline"
                >
                    아이디 찾기
                </Link>

                <span className="h-3 w-px bg-gray-200" />

                <Link
                    to="/find-pwd"
                    className="hover:text-gray-900 hover:underline"
                >
                    비밀번호 찾기
                </Link>

                <span className="h-3 w-px bg-gray-200" />

                <Link
                    to="/signup"
                    className="font-semibold hover:text-gray-900 hover:underline"
                >
                    회원가입
                </Link>
            </div>
        </div>
    );
}
