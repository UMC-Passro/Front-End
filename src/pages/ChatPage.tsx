import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { chatRooms } from "../data/chatRooms";

export default function ChatPage() {
    const navigate = useNavigate();
    const { chatRoomId } = useParams();
    const room = chatRooms.find((chatRoom) => chatRoom.id === chatRoomId);

    if (!room) {
        return <Navigate to="/delivery/chat" replace />;
    }

    return (
        <div className="flex page-container w-full flex-col overflow-hidden bg-white">
            {/* 상단바 영역 */}
            <div className="z-40 w-full shrink-0 border-b border-gray-100 bg-white">
                <PageHeader
                    title={room.participantName}
                    onBack={() => navigate("/delivery/chat")}
                    className="mb-3"
                    rightAction={
                        <button
                            type="button"
                            className="-mr-1 p-1 text-gray-600 focus:outline-none"
                            aria-label="채팅방 메뉴 열기"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </button>
                    }
                />

                {/* 상품 정보 카드 구역 */}
                <div className="flex items-center justify-between bg-[#F7F7F9] rounded-2xl p-4">
                    <div>
                        <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">
                            {room.itemName}
                        </h2>

                        <p className="text-sm text-gray-400 font-semibold">
                            {room.route}
                        </p>
                    </div>

                    {/* 배송 상태 태그 */}
                    <span className="bg-[#EBEBFF] text-[#6366F1] text-xs font-semibold px-3 py-1.5 rounded-xl">
                        {room.status}
                    </span>
                </div>
            </div>

            {/* 2. 채팅 내용 영역 */}
            <div className="scrollbar-hidden min-h-0 flex-1 space-y-4 overflow-y-auto bg-white py-6">
                {room.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] rounded-full px-4 py-3 text-[15px] font-semibold leading-relaxed shadow-sm ${
                                message.sender === "me"
                                    ? "bg-[#6366F1] text-white"
                                    : "bg-[#EFEFEF] text-gray-800"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. 채팅 입력 영역 */}
            <div className="w-full shrink-0 border-gray-100 bg-white py-4">
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
