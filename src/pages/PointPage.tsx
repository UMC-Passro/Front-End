/**
 * TODO: 포인트 관리 페이지를 구현하는 파일입니다.
 *
 * 구현 가이드:
 * - 보유 포인트, 정산 예정 포인트, 사용/적립 내역을 보여줍니다.
 * - 배송 완료 후 자동 정산 결과를 확인할 수 있게 구성합니다.
 * - 추후 포인트 현금 출금 기능을 붙일 영역을 남겨둡니다.
 */

export default function PointPage() {
    return (
        <div className="min-h-screen w-100 flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-gray-300 border border-black px-8 py-8 flex flex-col">
                <h1 className="text-2xl text-gray-500 font-bold">
                    사용 가능 포인트
                </h1>
                <div className="w-full flex flex-col gap-5 mt-5">
                    <div className="w-full px-4 py-3 mb-3 text-3xl text-gray-500">
                        3000 P
                    </div>
                </div>
                <button className="w-full bg-gray-700 text-white rounded-lg py-3 font-semibold">
                    충전
                </button>
                <div className="w-full flex flex-col mt-5">
                    <div className="w-full text-xl text-gray-500">
                        최근 사용 내역
                    </div>
                    <div className="w-full flex flex-col mt-3 gap-1 px-3">
                        <div className="w-full flex justify-between text-lg">
                            <div className="text-gray-500">우산</div>
                            <div className="text-gray-500">-500p</div>
                        </div>
                        <div className="w-full flex justify-between text-lg">
                            <div className="text-gray-500">적립</div>
                            <div className="text-gray-500">+3000p</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
