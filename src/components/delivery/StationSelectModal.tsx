import { useEffect, useState } from "react";
import { subwayApi } from "../../apis/subwayApi";
import { ApiError } from "../../types/api";

export interface Station {
    id: number;
    name: string;
    region: string;
}

interface StationSelectModalProps {
    title: string;
    onClose: () => void;
    onSelect: (station: Station) => void;
}

export default function StationSelectModal({
    title,
    onClose,
    onSelect,
}: StationSelectModalProps) {
    const [query, setQuery] = useState("");
    const [stations, setStations] = useState<Station[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const keyword = query.trim();
        if (!keyword) {
            setStations([]);
            setErrorMessage("");
            setIsLoading(false);
            return;
        }

        if (!/[가-힣0-9]/.test(keyword)) {
            setStations([]);
            setErrorMessage("검색어는 한글과 숫자만 입력해주세요.");
            setIsLoading(false);
            return;
        }

        let canceled = false;
        setStations([]);
        setErrorMessage("");
        setIsLoading(true);

        const timer = window.setTimeout(async () => {
            try {
                const result = await subwayApi.search(keyword);
                if (!canceled) {
                    setStations(
                        result.map((station) => ({
                            id: station.id,
                            name: station.stationName,
                            region: station.routeName,
                        })),
                    );
                }
            } catch (error) {
                if (!canceled) {
                    setStations([]);
                    setErrorMessage(
                        error instanceof ApiError
                            ? error.message
                            : "지하철역 검색 중 오류가 발생했습니다.",
                    );
                }
            } finally {
                if (!canceled) {
                    setIsLoading(false);
                }
            }
        }, 300);

        return () => {
            canceled = true;
            window.clearTimeout(timer);
        };
    }, [query]);

    return (
        <div
            className="bottom-sheet-backdrop-in fixed inset-0 z-[70] mx-auto flex w-full max-w-[402px] items-end bg-black/40"
            onClick={onClose}
        >
            <section
                className="bottom-sheet-panel-in flex max-h-[82dvh] w-full flex-col rounded-t-[30px] bg-white px-5 pb-6 pt-3 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="station-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    className="mx-auto h-1 w-[55px] rounded-full bg-gray-200"
                    aria-hidden="true"
                />

                <div className="mt-6 flex items-center justify-between">
                    <h2
                        id="station-modal-title"
                        className="text-xl font-bold text-gray-700"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100"
                        onClick={onClose}
                        aria-label="역 선택 닫기"
                    >
                        ×
                    </button>
                </div>

                <label className="mt-5 block">
                    <span className="sr-only">역 검색</span>
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="역 이름 또는 지역을 검색해주세요"
                        className="w-full rounded-xl bg-gray-50 px-4 py-3.5 text-[15px] text-gray-700 outline-none placeholder:text-gray-400"
                        autoFocus
                    />
                </label>

                <div className="scrollbar-hidden mt-4 min-h-0 overflow-y-auto">
                    {isLoading ? (
                        <p className="py-12 text-center text-sm text-gray-500">
                            검색중입니다...
                        </p>
                    ) : errorMessage ? (
                        <p className="py-12 text-center text-sm text-red-500">
                            {errorMessage}
                        </p>
                    ) : stations.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {stations.map((station) => (
                                <li key={station.id}>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50"
                                        onClick={() => onSelect(station)}
                                    >
                                        <span className="font-semibold text-gray-700">
                                            {station.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {station.region}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="py-12 text-center text-sm text-gray-500">
                            {query.trim()
                                ? "검색 결과가 없습니다."
                                : "역 이름을 검색해주세요."}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
