import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useState } from "react";
import {
    Report,
    REPORT_TYPE,
    ReportTargetType,
    ReportTypeKey,
} from "../types/report";
import { reportApi } from "../apis/reportApi";

type ReportLocationState = {
    targetType: ReportTargetType;
    deliveryId?: number;
    chatMessageId?: number;
    reportedAccountId?: number;
};

export default function ReportPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ReportLocationState | null;

    const [reason, setReason] = useState<ReportTypeKey | "">("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValid =
        state !== null &&
        reason !== "" &&
        content.trim().length > 0 &&
        !isSubmitting;

    const handleSubmit = async () => {
        if (!state) {
            setError("신고 대상 정보를 확인할 수 없습니다.");
            return;
        }

        if (!reason || !content.trim() || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const request: Report = {
            targetType: state.targetType,
            reason,
            detail: content.trim(),
            imageKeys: [],
            deliveryId: state?.deliveryId ?? 0,
            chatMessageId: state?.chatMessageId ?? 0,
            reportedAccountId: state?.reportedAccountId ?? 0,
        };

        try {
            await reportApi.create(request);
            navigate(-1);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "신고를 접수하지 못했습니다.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col page-container">
            <PageHeader title="신고하기" onBack={() => navigate(-1)} />
            <div className="mt-8 flex flex-col gap-3.5">
                <span className="text-sm text-gray-800 font-semibold">
                    신고유형
                </span>
                <div className="relative">
                    <select
                        id="reportType"
                        value={reason}
                        onChange={(event) =>
                            setReason(event.target.value as ReportTypeKey | "")
                        }
                        className="w-full bg-gray-50 rounded-[10px] px-5 py-[15px] text-gray-800"
                    >
                        <option value="" disabled>
                            신고 유형을 선택해주세요
                        </option>
                        {Object.entries(REPORT_TYPE).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-7 flex flex-col gap-3.5">
                <span className="text-sm text-gray-800 font-semibold">
                    신고내용
                </span>
                <textarea
                    id="reportDetail"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="신고 내용을 입력해주세요"
                    className="h-72 bg-gray-50 rounded-[10px] px-5 py-4 placeholder:text-gray-400 placeholder:font-semibold"
                />
                {error ? (
                    <p className="mt-3 text-sm text-errorRed">{error}</p>
                ) : null}
            </div>
            <div className="absolute bottom-5 left-4 right-4">
                <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={!isValid}
                    className={`w-full rounded-lg py-3.5 text-base font-bold transition-colors ${
                        isValid
                            ? "bg-errorRed text-white"
                            : "cursor-not-allowed bg-gray-100 text-gray-900"
                    }`}
                >
                    {isSubmitting ? "신고 중..." : "신고하기"}
                </button>
            </div>
        </div>
    );
}
