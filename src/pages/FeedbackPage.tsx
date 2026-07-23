export default function FeedbackPage() {
    return (
        <div className="page-container">
            <div className="flex flex-col h-full min-h-[inherit] bg-white relative pb-8 w-full overflow-hidden justify-between">
                
                {/* 상단바 영역 */}
                <div className="sticky top-0 z-50 w-full bg-white px-4 pt-3 pb-2">
                    <div className="flex items-center justify-between h-12">
                        {/* 뒤로가기 버튼 */}
                        <button className="p-1 -ml-1 text-gray-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        
                        {/* 페이지 제목 */}
                        <h1 className="text-[18px] font-bold text-gray-900 pr-6 flex-1 text-center">
                            완료확인
                        </h1>
                    </div>
                </div>

                {/* 중앙 피드백 콘텐츠 영역 */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-12 my-auto">
                    
                    {/* 1. 상단 질문 & 별점 섹션 */}
                    <div className="flex flex-col items-center w-full text-center">
                        <h2 className="text-[19px] font-bold text-gray-900 leading-snug mb-6">
                            감자튀김님, <br />
                            송현수님의 전달은 어떠셨나요?
                        </h2>
                        
                        {/* 5성점 별 아이콘 세트 */}
                        <div className="flex items-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-gray-100 cursor-pointer hover:text-yellow-400 transition">
                                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* 2. 하단 태그 선택 섹션 */}
                    <div className="flex flex-col items-center w-full text-center">
                        <h3 className="text-[18px] font-bold text-gray-900 mb-6">
                            어떤 점이 좋았나요?
                        </h3>
                        
                        {/* 태그 배치 정렬 */}
                        <div className="flex flex-col items-center space-y-3 w-full">
                            <div className="flex justify-center space-x-2">
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-[14px] font-medium active:bg-gray-200 focus:outline-none whitespace-nowrap">
                                    응답이 빨라요
                                </button>
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-[14px] font-medium active:bg-gray-200 focus:outline-none whitespace-nowrap">
                                    친절해요
                                </button>
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-[14px] font-medium active:bg-gray-200 focus:outline-none whitespace-nowrap">
                                    매너가 좋아요
                                </button>
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-[14px] font-medium active:bg-gray-200 focus:outline-none whitespace-nowrap">
                                    시간 약속 철저해요
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. 하단 고정 완료하기 버튼 영역 */}
                <div className="px-6 w-full mt-auto">
                    <button className="w-full bg-purple-500 text-white text-[16px] font-bold py-4 rounded-xl shadow-sm active:bg-indigo-700 transition focus:outline-none">
                        완료하기
                    </button>
                </div>

            </div>
        </div>
    )
}