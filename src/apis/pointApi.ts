export type PointTransactionType = "SAVING" | "USE" | "EXPIRE";

export interface PointTransaction {
    id: number;
    name: string;
    amount: number;
    type: PointTransactionType;
    createdAt: string;
}

export interface PointSummary {
    balance: number;
    transactions: PointTransaction[];
}

/**
 * 포인트 잔액 및 거래 내역 API가 확정되면 이 계약을 구현합니다.
 */
export interface PointApiContract {
    getSummary(): Promise<PointSummary>;
    getTransactions(
        type?: PointTransactionType,
    ): Promise<PointTransaction[]>;
}
