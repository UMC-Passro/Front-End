import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

/**
 * TODO: 배송자-발송자 인앱 채팅 페이지를 구현하는 파일입니다.
 *
 * 구현 가이드:
 * - 매칭된 배송 건별 채팅방을 보여줍니다.
 * - 메시지 목록과 메시지 입력 컴포넌트를 배치합니다.
 * - 실시간 통신 방식은 추후 백엔드 구조에 맞춰 결정합니다.
 */

export default function ChatPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-full w-full flex-col bg-white">

            {/* 상단바 영역 */}
            <div className="sticky top-0 z-50 w-full bg-white px-4 pt-3 pb-4 border-b border-gray-100">

                <PageHeader
                    title="송현수"
                    onBack={() => navigate(-1)}
                    className="mb-3"
                    rightAction={
                        <button
                            type="button"
                            className="-mr-1 p-1 text-gray-600 focus:outline-none"
                            aria-label="채팅방 메뉴 열기"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                    }
                />

                {/* 상품 정보 카드 구역 */}
                <div className="flex items-center justify-between bg-[#F7F7F9] rounded-2xl p-4">
                    <div>
                        <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">
                            무인양품 티셔츠
                        </h2>

                        <p className="text-sm text-gray-400 font-semibold">
                            안양 &rarr; 정왕역
                        </p>
                    </div>

                    {/* 배송 상태 태그 */}
                    <span className="bg-[#EBEBFF] text-[#6366F1] text-xs font-semibold px-3 py-1.5 rounded-xl">
                        배송중
                    </span>
                </div>

            </div>

            {/* 2. 채팅 내용 영역 */}
            <div className="flex-1 px-4 py-6 space-y-4 bg-white overflow-y-auto">

                {/* 내 메시지 (오른쪽 정렬) */}
                <div className="flex justify-end">
                    <div className="max-w-[75%] bg-[#6366F1] text-white text-[15px] px-4 py-3 rounded-full shadow-sm leading-relaxed font-semibold">
                        픽업 장소 도착했습니다!
                    </div>
                </div>

                {/* 상대방 메시지 (왼쪽 정렬) */}
                <div className="flex justify-start">
                    <div className="max-w-[75%] bg-[#EFEFEF] text-gray-800 text-[15px] px-4 py-3 rounded-full shadow-sm leading-relaxed font-semibold">
                        5분 뒤에 도착합니다. 감사합니다!
                    </div>
                </div>
            </div>

            {/* 3. 채팅 입력 영역 */}
            <div className="w-full border-gray-100 bg-white px-4 py-4">
                <div className="flex items-center bg-[#F7F7F9] rounded-[24px] px-4 py-2">

                    {/* 텍스트 입력창 */}
                    <input
                        type="text"
                        placeholder="채팅을 입력하세요"
                        className="flex-1 bg-transparent text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none"
                        readOnly
                    />

                    {/* 전송 버튼 */}
                    <button className="flex items-center justify-center w-8 h-8 bg-[#C2C2C9] text-white rounded-full ml-2 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}
