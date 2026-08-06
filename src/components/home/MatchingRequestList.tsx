import { useNavigate } from "react-router-dom";
import type { MatchingRequest } from "../../types/home";

type MatchingRequestListProps = {
    requests: MatchingRequest[];
};

export function MatchingRequestList({ requests }: MatchingRequestListProps) {
    const navigate = useNavigate();

    return (
        <div className="mt-3.5 flex flex-col gap-2.5">
            {requests.map((request) => (
                <article
                    key={request.id}
                    onClick={() =>
                        navigate(`/delivery/matching/${request.id}`)
                    }
                    className="grid min-h-[88px] cursor-pointer grid-cols-[minmax(0,1fr)_76px] items-center gap-3 rounded-lg bg-gray-50 px-5 py-3 hover:bg-gray-100"
                >
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-gray-800">
                            {request.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-2 break-keep text-xs font-semibold leading-5 text-gray-500">
                            {request.route}
                        </p>
                    </div>
                    <span
                        className="inline-flex w-[76px] items-center justify-center rounded-lg bg-purple-100 px-2 py-2 text-center text-xs font-bold text-purple-700"
                        style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                        {request.timeLeft}
                    </span>
                </article>
            ))}
        </div>
    );
}
