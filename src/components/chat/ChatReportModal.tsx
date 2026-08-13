import { useEffect, useId, useState } from "react";
import ChevronIcon from "../../assets/icons/ChevronIcon";
import type { ReportReason } from "../../apis/reportApi";

interface ChatReportModalProps {
    isSubmitting?: boolean;
    errorMessage?: string;
    onClose: () => void;
    onSubmit: (reason: ReportReason, detail: string) => void;
}

const REPORT_REASONS: Array<{ value: ReportReason; label: string }> = [
    { value: "SPAM", label: "스팸 및 광고" },
    { value: "ABUSE", label: "욕설 및 비방" },
    { value: "FRAUD", label: "사기 의심" },
    { value: "HARASSMENT", label: "괴롭힘" },
    { value: "INAPPROPRIATE_CONTENT", label: "부적절한 콘텐츠" },
    { value: "OTHER", label: "기타" },
];

export default function ChatReportModal({
    isSubmitting = false,
    errorMessage,
    onClose,
    onSubmit,
}: ChatReportModalProps) {
    const selectId = useId();
    const detailId = useId();
    const [reason, setReason] = useState<ReportReason | "">("");
    const [detail, setDetail] = useState("");
    const trimmedDetail = detail.trim();
    const canSubmit = Boolean(reason && trimmedDetail) && !isSubmitting;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isSubmitting) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSubmitting, onClose]);

    return (
        <div
            className="fixed inset-0 z-[110] mx-auto flex w-full max-w-[402px] items-center justify-center bg-black/30 px-5"
            onClick={isSubmitting ? undefined : onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-label="채팅 상대 신고하기"
                className="w-full max-w-[360px] rounded-2xl bg-white px-5 pb-5 pt-[22px]"
                onClick={(event) => event.stopPropagation()}
            >
                <label htmlFor={selectId} className="relative block">
                    <select
                        id={selectId}
                        value={reason}
                        onChange={(event) =>
                            setReason(event.target.value as ReportReason | "")
                        }
                        disabled={isSubmitting}
                        className={`h-[52px] w-full appearance-none rounded-[10px] bg-[#F8F9FD] px-5 pr-12 text-[15px] font-medium leading-[22px] outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-default ${
                            reason ? "text-gray-800" : "text-gray-500"
                        }`}
                    >
                        <option value="" disabled>
                            신고 유형
                        </option>
                        {REPORT_REASONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span
                        className="pointer-events-none absolute right-5 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 -rotate-90 items-center justify-center text-gray-800"
                        aria-hidden="true"
                    >
                        <ChevronIcon />
                    </span>
                </label>

                <label htmlFor={detailId} className="mt-[10px] block">
                    <span className="sr-only">신고 사유</span>
                    <textarea
                        id={detailId}
                        value={detail}
                        onChange={(event) => setDetail(event.target.value)}
                        disabled={isSubmitting}
                        maxLength={1000}
                        placeholder="신고 사유를 입력해주세요."
                        className="block h-[152px] w-full resize-none rounded-[10px] bg-[#F8F9FD] px-5 py-[15px] text-[15px] font-medium leading-[22px] text-gray-800 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-purple-200 disabled:text-gray-400"
                    />
                </label>

                {errorMessage ? (
                    <p
                        className="mt-2 text-xs font-medium text-errorRed"
                        role="alert"
                    >
                        {errorMessage}
                    </p>
                ) : null}

                <div className="mt-5 grid grid-cols-2 gap-[10px]">
                    <button
                        type="button"
                        onClick={() =>
                            reason && onSubmit(reason, trimmedDetail)
                        }
                        disabled={!canSubmit}
                        className="flex h-10 items-center justify-center rounded-[10px] bg-errorRed text-sm font-semibold text-[#F8F9FD] transition-colors disabled:bg-gray-300"
                    >
                        {isSubmitting ? "신고 중..." : "신고하기"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex h-10 items-center justify-center rounded-[10px] bg-gray-100 text-sm font-medium text-gray-800 disabled:text-gray-400"
                    >
                        닫기
                    </button>
                </div>
            </section>
        </div>
    );
}
