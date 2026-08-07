import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useCallback, useEffect, useState } from "react";
import { chatApi } from "../apis";
import { useApiRequest } from "../hooks/useApiRequest";
import type { ChatRoom } from "../data/chatRooms";

export default function ChatListPage() {
    const navigate = useNavigate();

    const loadChatList = useCallback(() => {
        return chatApi.getRooms();
    }, []);

    const { data, error, isLoading, execute } = useApiRequest(loadChatList);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    useEffect(() => {
        let isStopped = false;
        let timerId: number;

        const pollChatRooms = async () => {
            try {
                await execute();
            } catch {
                // 일시적인 폴링 실패는 다음 주기에 다시 시도한다.
            } finally {
                if (!isStopped) {
                    timerId = window.setTimeout(pollChatRooms, 1_000);
                }
            }
        };

        void pollChatRooms();

        return () => {
            isStopped = true;
            window.clearTimeout(timerId);
        };
    }, [execute]);

    useEffect(() => {
        if (!data) {
            return;
        }

        const tempChatRooms: ChatRoom[] = [];

        data.forEach(datum => {
            if (!datum.lastMessage) return;

            const date = new Date(datum.lastMessageAt);

            let dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `;

            if (date.getHours() < 12) {
                dateString += `오후 ${date.getHours() - 12}:${date.getMinutes()}`
            } else if (date.getHours() == 12) {
                dateString += `오후 ${date.getHours()}:${date.getMinutes()}`
            } else if (date.getHours() > 12) {
                dateString += `오후 ${date.getHours() - 12}:${date.getMinutes()}`
            }

            tempChatRooms.push({
                id: datum.deliveryId.toString(),
                participantName: datum.partner.nickname,
                itemName: datum.itemName,
                route: "",
                status: "",
                lastMessage: datum.lastMessage,
                updatedAt: dateString,
                unreadCount: datum.unreadCount,
                messages: []
            })
        });

        setChatRooms(tempChatRooms);
    }, [data]);

    return (
        <main className="page-container flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="채팅"
                onBack={() => navigate("/home")}
                className="shrink-0"
            />

            <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto pt-5">
                <ul className="divide-y divide-gray-100">
                    {chatRooms.map((room) => (
                        <li key={room.id}>
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/delivery/chat/${room.id}`)
                                }
                                className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-gray-50 focus:outline-none"
                                aria-label={`${room.participantName}님과의 채팅 열기`}
                            >
                                <span
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-base font-bold text-purple-600"
                                    aria-hidden="true"
                                >
                                    {room.participantName.charAt(0)}
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2">
                                        <strong className="truncate text-[16px] text-gray-900">
                                            {room.participantName}
                                        </strong>
                                        <span className="truncate text-xs font-medium text-gray-400">
                                            {room.itemName}
                                        </span>
                                    </span>
                                    <span className="mt-1 block truncate text-sm text-gray-500">
                                        {room.lastMessage}
                                    </span>
                                </span>

                                <span className="flex shrink-0 flex-col items-end gap-2">
                                    <time className="text-xs text-gray-400">
                                        {room.updatedAt}
                                    </time>
                                    {room.unreadCount > 0 ? (
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-500 px-1.5 text-[11px] font-bold text-white">
                                            {room.unreadCount}
                                        </span>
                                    ) : (
                                        <span className="h-5" aria-hidden="true" />
                                    )}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
