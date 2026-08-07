import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { chatApi } from "../apis";
import type { ChatMessage } from "../apis/chatApi";
import { deliveryApi } from "../apis/deliveryApi";
import { matchingApi } from "../apis/matchingApi";
import PageHeader from "../components/common/PageHeader";
import { useApiRequest } from "../hooks/useApiRequest";
import { ApiError } from "../types/api";
import { getDeliveryStatusLabel } from "../utils/deliveryStatus";

export default function ChatPage() {
    const navigate = useNavigate();
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const messageEndRef = useRef<HTMLDivElement>(null);
    const latestMessageIdRef = useRef<number | undefined>(undefined);
    const messagesRef = useRef<ChatMessage[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState("");

    const mergeMessages = useCallback((nextMessages: ChatMessage[]) => {
        if (nextMessages.length === 0) {
            return;
        }

        latestMessageIdRef.current = Math.max(
            latestMessageIdRef.current ?? 0,
            ...nextMessages.map((message) => message.id),
        );

        setMessages((previousMessages) => {
            const messageMap = new Map(
                previousMessages.map((message) => [message.id, message]),
            );

            nextMessages.forEach((message) => {
                messageMap.set(message.id, message);
            });

            const mergedMessages = [...messageMap.values()].sort(
                (a, b) => a.id - b.id,
            );
            messagesRef.current = mergedMessages;
            return mergedMessages;
        });
    }, []);

    const loadChatRoom = useCallback(async () => {
        const deliveryId = Number(chatRoomId);

        if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
            throw new ApiError({ message: "올바르지 않은 채팅방입니다." });
        }

        const [messages, roomInfo, senderDeliveries, shipperDeliveries] =
            await Promise.all([
                chatApi.getMessages(deliveryId),
                chatApi.getRoomInfo(deliveryId),
                deliveryApi.getSenderDeliveries().catch(() => []),
                matchingApi.getMyDeliveries().catch(() => []),
            ]);

        const deliveryRole = senderDeliveries.some(
            (delivery) => delivery.deliveryId === deliveryId,
        )
            ? "sender"
            : shipperDeliveries.some((delivery) => delivery.id === deliveryId)
                ? "shipper"
                : null;

        return { messages, roomInfo, deliveryRole };
    }, [chatRoomId]);

    const { data, error, isLoading, execute } = useApiRequest(loadChatRoom);

    useEffect(() => {
        void execute().catch(() => undefined);
    }, [execute]);

    useEffect(() => {
        if (!data) {
            return;
        }

        const initialMessages = [...data.messages].sort((a, b) => a.id - b.id);
        messagesRef.current = initialMessages;
        setMessages(initialMessages);
        latestMessageIdRef.current = initialMessages.at(-1)?.id;
    }, [data]);

    useEffect(() => {
        if (!data) {
            return;
        }

        const deliveryId = Number(chatRoomId);
        if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
            return;
        }

        let isStopped = false;
        let timerId: number;

        const pollMessages = async () => {
            try {
                const oldestUnreadMessageIndex = messagesRef.current.findIndex(
                    (message) =>
                        !message.isRead &&
                        message.senderNickname !==
                            data.roomInfo.partnerNickname,
                );
                const pollingAfterId =
                    oldestUnreadMessageIndex >= 0
                        ? messagesRef.current[oldestUnreadMessageIndex - 1]?.id
                        : latestMessageIdRef.current;
                const nextMessages = await chatApi.getMessages(
                    deliveryId,
                    pollingAfterId,
                );

                if (!isStopped) {
                    mergeMessages(nextMessages);
                }
            } catch {
                // 일시적인 폴링 실패는 다음 주기에 다시 시도한다.
            } finally {
                if (!isStopped) {
                    timerId = window.setTimeout(pollMessages, 1_000);
                }
            }
        };

        timerId = window.setTimeout(pollMessages, 1_000);

        return () => {
            isStopped = true;
            window.clearTimeout(timerId);
        };
    }, [chatRoomId, data, mergeMessages]);

    useEffect(() => {
        if (messages.length) {
            messageEndRef.current?.scrollIntoView({ block: "end" });
        }
    }, [messages.length]);

    const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const content = draft.trim();
        const deliveryId = Number(chatRoomId);
        if (
            !content ||
            isSending ||
            !Number.isInteger(deliveryId) ||
            deliveryId <= 0
        ) {
            return;
        }

        setIsSending(true);
        setSendError("");

        try {
            const sentMessage = await chatApi.sendMessage(deliveryId, {
                content,
            });
            mergeMessages([sentMessage]);
            setDraft("");
        } catch (caughtError) {
            setSendError(
                caughtError instanceof ApiError
                    ? caughtError.message
                    : "메시지를 전송하지 못했습니다.",
            );
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading || (!data && !error)) {
        return (
            <div className="flex h-full items-center justify-center bg-white text-sm text-gray-500">
                채팅을 불러오는 중입니다...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex h-full flex-col bg-white">
                <PageHeader
                    title="채팅"
                    onBack={() => navigate("/delivery/chat")}
                    className="shrink-0 px-4 pt-3"
                />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                    <p className="text-sm text-red-500">
                        {error?.message ?? "채팅을 불러오지 못했습니다."}
                    </p>
                    <button
                        type="button"
                        onClick={() => void execute().catch(() => undefined)}
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    const { roomInfo, deliveryRole } = data;
    const deliveryId = Number(chatRoomId);
    const route = [roomInfo.departure, roomInfo.arrival]
        .filter((station): station is string => Boolean(station))
        .join(" → ");

    const handleDeliveryNavigate = () => {
        if (deliveryRole === "sender") {
            navigate(`/delivery/status/${deliveryId}`);
        }

        if (deliveryRole === "shipper") {
            navigate(`/delivery/tracking/${deliveryId}`);
        }
    };

    return (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
            <div className="z-40 w-full shrink-0 border-b border-gray-100 bg-white px-4 pb-4 pt-3">
                <PageHeader
                    title={roomInfo.partnerNickname}
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

                <button
                    type="button"
                    onClick={handleDeliveryNavigate}
                    disabled={!deliveryRole}
                    className="flex w-full items-center justify-between rounded-2xl bg-[#F7F7F9] p-4 text-left transition-colors enabled:hover:bg-gray-100 disabled:cursor-default"
                    aria-label={
                        deliveryRole
                            ? `${roomInfo.itemName ?? "배송 물품"} 상세 보기`
                            : "배송 물품 정보"
                    }
                >
                    <div className="min-w-0">
                        <h2 className="mb-0.5 truncate text-[15px] font-bold text-gray-900">
                            {roomInfo.itemName ?? "배송 물품"}
                        </h2>
                        {route ? (
                            <p className="truncate text-sm font-semibold text-gray-400">
                                {route}
                            </p>
                        ) : null}
                    </div>
                    <span className="ml-3 shrink-0 rounded-xl bg-[#EBEBFF] px-3 py-1.5 text-xs font-semibold text-[#6366F1]">
                        {getDeliveryStatusLabel(roomInfo.deliveryStatus)}
                    </span>
                </button>
            </div>

            <div className="scrollbar-hidden min-h-0 flex-1 space-y-1 overflow-y-auto bg-white px-4 py-6">
                {messages.length === 0 ? (
                    <p className="py-12 text-center text-sm text-gray-400">
                        아직 주고받은 메시지가 없습니다.
                    </p>
                ) : (
                    messages.map((message) => {
                        const isMine =
                            message.senderNickname !== roomInfo.partnerNickname;

                        return (
                            <div
                                key={message.id}
                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`flex max-w-[75%] flex-col ${isMine ? "items-end" : "items-start"
                                        }`}
                                >
                                    <div
                                        className={`rounded-3xl px-4 py-3 text-[15px] font-semibold leading-relaxed shadow-sm ${isMine
                                            ? "bg-[#6366F1] text-white"
                                            : "bg-[#EFEFEF] text-gray-800"
                                            }`}
                                    >
                                        {message.content}
                                    </div>

                                    {isMine && !message.isRead ? (
                                        <span className="mt-[2px] px-1 mr-[8px] text-[12px] font-normal text-gray-400">
                                            읽지 않음
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messageEndRef} />
            </div>

            <div className="w-full shrink-0 border-gray-100 bg-white px-4 py-4">
                {sendError ? (
                    <p className="mb-2 px-2 text-xs text-red-500">
                        {sendError}
                    </p>
                ) : null}
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center rounded-[24px] bg-[#F7F7F9] px-4 py-2"
                >
                    <input
                        type="text"
                        placeholder="채팅을 입력하세요"
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            if (sendError) {
                                setSendError("");
                            }
                        }}
                        disabled={isSending}
                        className="flex-1 bg-transparent text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!draft.trim() || isSending}
                        className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6366F1] text-white disabled:bg-[#C2C2C9]"
                        aria-label="메시지 전송"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
