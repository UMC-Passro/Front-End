export interface LiveLocation {
    latitude: number;
    longitude: number;
    recordedAt: string;
}

/**
 * 위치 전송 주기와 REST/Socket 명세가 확정되면 이 계약을 구현합니다.
 */
export interface LocationApiContract {
    sendLocation(
        deliveryId: number,
        location: Omit<LiveLocation, "recordedAt">,
    ): Promise<void>;
    getLocation(deliveryId: number): Promise<LiveLocation>;
    setSharing(deliveryId: number, enabled: boolean): Promise<void>;
}
