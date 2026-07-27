export interface NotificationItem {
    id: number;
    title: string;
    content: string;
    read: boolean;
    createdAt: string;
}

/**
 * 알림 및 푸시 토큰 API 명세가 확정되면 이 계약을 구현합니다.
 */
export interface NotificationApiContract {
    getNotifications(): Promise<NotificationItem[]>;
    markAsRead(notificationId: number): Promise<void>;
    registerPushToken(token: string): Promise<void>;
}
