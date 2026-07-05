/**
 * TODO: 회원가입 페이지를 구현하는 파일입니다.
 *
 * 구현 가이드:
 * - 기본 사용자 정보와 학교 인증 정보를 입력받습니다.
 * - 발송자/배송자 공통 가입 흐름을 먼저 만들고, 필요하면 역할 선택을 추가합니다.
 * - 가입 이후 통학 경로 등록 화면으로 이어지는 흐름을 고려합니다.
 */
import { Link } from "react-router-dom";

export default function MyPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* 전체 카드 상자 */}
            <div className="w-full max-w-md bg-gray-300 border border-black py-12 px-8 flex flex-col gap-8 rounded-lg shadow-md">
                
                {/* 상단 프로필 영역 (사진 + 텍스트 가로 배치) */}
                <div className="flex items-center gap-6 w-full pb-4 border-b border-gray-400">
                    
                    {/* 1. 동그라미 프로필 사진 틀 */}
                    <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center border-2 border-gray-500 shrink-0">
                        {/* 임시로 넣은 아이콘 모양 텍스트 (나중에 <img> 태그로 바꾸면 됩니다) */}
                        <span className="text-gray-200 text-xs">사진</span>
                    </div>

                    {/* 2. 닉네임 및 발송자 정보 */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-gray-700 font-bold mb-0.5">
                            닉네임
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            발송자 or 배송자
                        </p>
                    </div>
                </div>

                {/* 닉네임 변경 섹션 */}
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg text-gray-600 font-bold">
                        닉네임 변경
                    </h2>
                    <input 
                        type="text"
                        placeholder="NickName"
                        className="w-full border border-gray-400 text-sm rounded-md px-4 py-2.5 bg-white outline-none focus:border-gray-600"
                    />
                </div>

                {/* 비밀번호 변경 섹션 */}
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg text-gray-600 font-bold">
                        비밀번호 변경
                    </h2>
                    <div className="flex flex-col gap-2">
                        <input 
                            type="password"
                            placeholder="기존 비밀번호"
                            className="w-full border border-gray-400 text-sm rounded-md px-4 py-2.5 bg-white outline-none focus:border-gray-600"
                        />
                        <input 
                            type="password"
                            placeholder="변경 비밀번호"
                            className="w-full border border-gray-400 text-sm rounded-md px-4 py-2.5 bg-white outline-none focus:border-gray-600"
                        />
                    </div>
                </div>

                {/* 저장 버튼 */}
                <button className="w-full bg-gray-700 hover:bg-gray-800 text-white rounded-md py-3 font-semibold transition-colors mt-4">
                    변경사항 저장
                </button>
            </div>
        </div>
    )
}