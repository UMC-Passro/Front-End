export default function RequestCompletePage() {
    return (
        <div className="page-container">
            <div className="flex flex-col h-full min-h-[inherit] bg-white relative pb-6 w-full overflow-hidden justify-between">
                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
                    {/* 로고 이미지 */}
                    <img 
                        src="/Logo.png" 
                        alt="Logo" 
                        width={250} 
                        height={250} 
                        className="object-contain mb-6 max-w-[60%]" // 화면 크기에 맞춰 로고도 유연하게 조절
                    />

                    {/* 완료 문구 */}
                    <div className="text-xl font-bold text-gray-900 text-center">
                        등록이 완료되었어요!
                    </div>
                </div>

                {/* 완료하기 */}
                <div className="px-6 w-full mt-auto">
                    <button className="w-full bg-purple-500 text-white font-bold py-3.5 rounded-xl shadow-sm active:bg-indigo-700 transition focus:outline-none">
                        완료하기
                    </button>
                </div>

            </div>
        </div>
    )
}