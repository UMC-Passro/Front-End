/**
 * TODO: 로그인 페이지를 구현하는 파일입니다.
 *
 * 구현 가이드:
 * - 이메일/비밀번호 또는 학교 인증 기반 로그인 폼을 구성합니다.
 * - 로그인 성공 후 메인 또는 마이페이지로 이동하는 흐름을 연결합니다.
 * - 인증 API 연동과 에러 메시지 표시 로직을 나중에 추가합니다.
 */

import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-gray-300 border border-black py-16 px-8 flex flex-col items-center gap-6">
                <h1 className="text-7xl text-gray-500 font-bold mb-10">
                    Passro
                </h1>

                <div className="w-full flex flex-col gap-5">
                    <input 
                        type="email"
                        placeholder="이메일"
                        className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                    />
                    <input 
                        type="password"
                        placeholder="비밀번호"
                        className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none mb-3"
                    />
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
                    <button className="w-full bg-gray-700 text-white rounded-lg py-3 font-semibold">
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
}