import blockIcon from "../../assets/icons/block.svg";
import reportIcon from "../../assets/icons/report.svg";
import noAlarmIcon from "../../assets/icons/noAlarm.svg";
import existIcon from "../../assets/icons/exist.svg";
import { useNavigate } from "react-router-dom";

interface ChatModalProps {
    onClose: () => void;
    chatMessageId: number;
}

export default function ChatModal({ onClose, chatMessageId }: ChatModalProps) {
    const navigate = useNavigate();
    const handleReport = () => {
        onClose();
        navigate("/report", {
            state: {
                targetType: "CHAT_MESSAGE",
                chatMessageId,
            },
        });
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[320px] rounded-2xl bg-white p-5"
            >
                <div className="flex flex-col bg-gray-50 mb-5 rounded-xl">
                    <div className="flex gap-4 px-6 py-4 border-b border-gray-100">
                        <img src={blockIcon} />
                        <span className="flex text-gray-900">차단하기</span>
                    </div>
                    <button
                        onClick={handleReport}
                        className="flex gap-4 px-6 py-4 border-b border-gray-100"
                    >
                        <img src={reportIcon} />
                        <span className="flex text-gray-900">신고하기</span>
                    </button>
                    <div className="flex gap-4 px-6 py-4 border-b border-gray-100">
                        <img src={noAlarmIcon} />
                        <span className="flex text-gray-900">알림끄기</span>
                    </div>
                    <div className="flex gap-4 px-6 py-4">
                        <img src={existIcon} />
                        <span className="flex text-errorRed">
                            채팅방 나가기
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="flex w-full items-center justify-center bg-gray-100 rounded-[10px] py-2.5 text-gray-900 text-sm"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
