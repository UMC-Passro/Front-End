export interface ChatMessage {
    id: number;
    roomId: number;
    senderId: number;
    content: string;
    createdAt: string;
    read: boolean;
}

export interface SendMessageRequest {
    content: string;
}

/**
 * 채팅 REST/Socket 명세가 확정되면 이 계약을 구현합니다.
 */
export interface ChatApiContract {
    getMessages(roomId: number): Promise<ChatMessage[]>;
    sendMessage(
        roomId: number,
        request: SendMessageRequest,
    ): Promise<ChatMessage>;
}
