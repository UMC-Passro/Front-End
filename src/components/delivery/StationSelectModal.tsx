import { useEffect, useMemo, useState } from "react";

export interface Station {
    id: string;
    name: string;
    region: string;
}

const INITIAL_STATIONS: Station[] = [
    { id: "seoul", name: "서울역", region: "서울특별시" },
    { id: "yongsan", name: "용산역", region: "서울특별시" },
    { id: "yeongdeungpo", name: "영등포역", region: "서울특별시" },
    { id: "cheongnyangni", name: "청량리역", region: "서울특별시" },
    { id: "suseo", name: "수서역", region: "서울특별시" },
    { id: "haengsin", name: "행신역", region: "경기도 고양시" },
    { id: "gwangmyeong", name: "광명역", region: "경기도 광명시" },
    { id: "suwon", name: "수원역", region: "경기도 수원시" },
    { id: "pyeongtaek", name: "평택역", region: "경기도 평택시" },
    { id: "cheonan", name: "천안역", region: "충청남도 천안시" },
    { id: "cheonan-asan", name: "천안아산역", region: "충청남도 아산시" },
    { id: "gongju", name: "공주역", region: "충청남도 공주시" },
    { id: "osong", name: "오송역", region: "충청북도 청주시" },
    { id: "daejeon", name: "대전역", region: "대전광역시" },
    { id: "seodaejeon", name: "서대전역", region: "대전광역시" },
    { id: "jecheon", name: "제천역", region: "충청북도 제천시" },
    { id: "wonju", name: "원주역", region: "강원특별자치도 원주시" },
    { id: "gangneung", name: "강릉역", region: "강원특별자치도 강릉시" },
    { id: "chuncheon", name: "춘천역", region: "강원특별자치도 춘천시" },
    { id: "jeonju", name: "전주역", region: "전북특별자치도 전주시" },
    { id: "iksan", name: "익산역", region: "전북특별자치도 익산시" },
    { id: "gwangju-songjeong", name: "광주송정역", region: "광주광역시" },
    { id: "mokpo", name: "목포역", region: "전라남도 목포시" },
    { id: "suncheon", name: "순천역", region: "전라남도 순천시" },
    { id: "yeosu-expo", name: "여수엑스포역", region: "전라남도 여수시" },
    { id: "gimcheon-gumi", name: "김천구미역", region: "경상북도 김천시" },
    { id: "gumi", name: "구미역", region: "경상북도 구미시" },
    { id: "daegu", name: "대구역", region: "대구광역시" },
    { id: "dongdaegu", name: "동대구역", region: "대구광역시" },
    { id: "gyeongju", name: "경주역", region: "경상북도 경주시" },
    { id: "pohang", name: "포항역", region: "경상북도 포항시" },
    { id: "ulsan", name: "울산역", region: "울산광역시" },
    { id: "miryang", name: "밀양역", region: "경상남도 밀양시" },
    { id: "changwon-jungang", name: "창원중앙역", region: "경상남도 창원시" },
    { id: "masan", name: "마산역", region: "경상남도 창원시" },
    { id: "jinju", name: "진주역", region: "경상남도 진주시" },
    { id: "gupo", name: "구포역", region: "부산광역시" },
    { id: "busan", name: "부산역", region: "부산광역시" },
];

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const filteredStations = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

        if (!normalizedQuery) {
            return INITIAL_STATIONS;
        }

        return INITIAL_STATIONS.filter((station) =>
            `${station.name} ${station.region}`
                .toLocaleLowerCase("ko-KR")
                .includes(normalizedQuery),
        );
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
                        className="w-full rounded-xl bg-gray-50 px-4 py-3.5 text-[15px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
                        autoFocus
                    />
                </label>

                <div className="scrollbar-hidden mt-4 min-h-0 overflow-y-auto">
                    {filteredStations.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {filteredStations.map((station) => (
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
                            검색 결과가 없습니다.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
