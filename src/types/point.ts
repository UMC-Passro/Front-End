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
