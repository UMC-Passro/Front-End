import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import type { InquiryCategory } from "../apis/inquiryApi";

const inquiryOptions: Array<{
    value: InquiryCategory;
    label: string;
}> = [
    { value: "DELAY", label: "배송 지연" },
    { value: "DAMAGE", label: "물품 파손" },
    { value: "LOST", label: "물품 분실" },
    { value: "WRONG_DELIVERY", label: "오배송" },
    { value: "POINT", label: "요금 및 포인트" },
    { value: "ETC", label: "기타" },
];

export default function InquiryPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState<InquiryCategory | "">("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!category) {
            setErrorMessage("문의 유형을 선택해주세요.");
            return;
        }

        if (!content.trim()) {
            setErrorMessage("문의 내용을 입력해주세요.");
            return;
        }

        setErrorMessage(
            "문의 등록에는 문의할 배송 정보가 필요합니다. 배송 선택 방식이 연결된 후 등록할 수 있습니다.",
        );
    };

    return (
        <main className="page-container flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="문의하기"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />

            <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
            >
                <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-1 pb-6 pt-5">
                    <div className="flex flex-col gap-7">
                        <label className="flex flex-col gap-3.5">
                            <span className="text-sm font-semibold leading-[22px] text-gray-800">
                                문의유형
                            </span>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(event) => {
                                        setCategory(
                                            event.target.value as
                                                | InquiryCategory
                                                | "",
                                        );
                                        setErrorMessage("");
                                    }}
                                    className="h-[52px] w-full appearance-none rounded-[10px] bg-gray-50 px-5 pr-12 text-[15px] font-semibold leading-[22px] text-gray-800 outline-none"
                                >
                                    <option value="">
                                        문의 유형을 선택해주세요
                                    </option>
                                    {inquiryOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl leading-none text-gray-400"
                                    aria-hidden="true"
                                >
                                    ⌄
                                </span>
                            </div>
                        </label>

                        <label className="flex flex-col gap-3.5">
                            <span className="text-sm font-semibold leading-[22px] text-gray-800">
                                문의내용
                            </span>
                            <textarea
                                value={content}
                                onChange={(event) => {
                                    setContent(event.target.value);
                                    setErrorMessage("");
                                }}
                                placeholder="문의 내용을 입력해주세요."
                                className="h-[312px] w-full resize-none rounded-[10px] bg-gray-50 px-5 py-[15px] text-[15px] font-semibold leading-[22px] text-gray-800 outline-none placeholder:text-gray-400"
                            />
                        </label>

                        {errorMessage ? (
                            <p
                                className="text-xs font-semibold leading-5 text-red-500"
                                role="alert"
                            >
                                {errorMessage}
                            </p>
                        ) : null}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full shrink-0 rounded-[10px] bg-purple-500 px-2.5 py-3.5 text-base font-bold leading-[22px] text-white transition-colors hover:bg-purple-600 focus:outline-none"
                >
                    등록하기
                </button>
            </form>
        </main>
    );
}
