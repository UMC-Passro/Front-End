import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <div className="page-container mx-auto w-full max-w-[402px] pb-[14px] min-h-full flex h-full flex-col bg-white px-4">
      <PageHeader title="프로필 설정" onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto pt-4 pb-6">
        {/* 1. 프로필 영역 */}
        <div className="flex flex-col items-center justify-center mb-6">
          {/* 프로필 이미지 & 카메라 버튼 */}
          <div className="relative w-24 h-24">
            <img
              src="https://via.placeholder.com/150"
              alt="프로필 이미지"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              type="button"
              aria-label="프로필 사진 변경"
              className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* 이름 & 볼펜 아이콘 */}
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-xl font-bold text-gray-900">송현수</span>
            <button type="button" aria-label="이름 수정">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. 수정 내용 */}
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">이름</span>
            <div className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base">
              송현수
            </div>
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">전화번호</span>
            <div className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base">
              010-1010-1010
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">생년월일</span>
            <div className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base flex items-center justify-between">
              <span>1999년 6월 4일</span>
              {/* 달력 버튼 */}
              <button
                type="button"
                aria-label="생년월일 날짜 선택"
                onClick={() => {
                  /* 달력 모달/피커 열기 로직 추가 */
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition rounded-md focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">주소</span>
            <div className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base">
              서울시 마포구
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">이메일</span>
            <div className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base">
              pitapat@umc.ac.kr
            </div>
          </div>

          {/* 비밀번호 변경 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600 pl-0.5">비밀번호 변경</span>
            <button
              type="button"
              className="w-full px-4 py-3.5 bg-gray-50 text-gray-800 font-medium rounded-xl text-base flex items-center justify-between transition active:bg-gray-100"
            >
              <span>비밀번호 변경</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="shrink-0 pt-[14px]">
        <button
          type="button"
          className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-purple-500 text-[16px] font-bold leading-[22px] text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}