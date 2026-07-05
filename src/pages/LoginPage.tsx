import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const from = location.state && typeof location.state === "object" && "from" in location.state
        ? (location.state.from as { pathname?: string }).pathname
        : "/mypage";

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErrorMessage("이메일과 비밀번호를 입력해 주세요.");
            return;
        }

        login(email);
        navigate(from || "/mypage", { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-gray-300 border border-black py-16 px-8 flex flex-col items-center gap-6">
                <h1 className="text-7xl text-gray-500 font-bold mb-10">
                    Passro
                </h1>

                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                        aria-label="이메일"
                        autoComplete="email"
                    />
                    <input 
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none mb-3"
                        aria-label="비밀번호"
                        autoComplete="current-password"
                    />
                    {errorMessage ? (
                        <p className="-mt-3 text-sm font-semibold text-red-700" role="alert">
                            {errorMessage}
                        </p>
                    ) : null}
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                        <Link 
                            to="/signup"
                            className="hover:text-gray-900 hover:underline"                        
                        >
                            회원가입
                        </Link>
                        
                        <span className="h-3 w-px bg-gray-400" />

                        <Link 
                            to="/find-pwd" 
                            className="hover:text-gray-900 hover:underline"
                        >
                            비밀번호 찾기
                        </Link>
                    </div>
                    <button type="submit" className="w-full bg-gray-700 text-white rounded-lg py-3 font-semibold">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}
