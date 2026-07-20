/**
 * TODO: 포인트와 정산 관련 타입을 정의하는 파일입니다.
 *
 * 구현 가이드:
 * - 포인트 잔액, 정산 내역, 정산 상태, 출금 신청 타입을 정의합니다.
 * - 자동 정산 결과를 화면과 API에서 함께 사용할 수 있게 합니다.
 * - MVP에서는 자동 정산 중심으로, 출금은 확장 타입으로 남겨둡니다.
 */

export const POINT_FILTER = {
    ALL: {
        label: "전체",
        code: null, // 또는 "ALL" (서버 정책에 맞게)
    },
    SAVING: {
        label: "적립",
        code: "SAVING",
    },
    USE: {
        label: "사용",
        code: "USE",
    },
    EXPIRE: {
        label: "소멸",
        code: "EXPIRE",
    },
} as const;

export type PointFilterKey = keyof typeof POINT_FILTER;

export type PointFilterLabel = (typeof POINT_FILTER)[PointFilterKey]["label"];

export type PointFilter = Exclude<
    (typeof POINT_FILTER)[PointFilterKey]["code"],
    null
>;
