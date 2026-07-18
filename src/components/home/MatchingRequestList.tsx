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
                    onClick={() => navigate("/delivery/matching")}
                    className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-5 py-3 hover:bg-gray-100 cursor-pointer"
                >
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-gray-800">
                            {request.title}
                        </h3>
                        <p className="mt-0.5 text-xs font-semibold text-gray-500">
                            {request.route}
                        </p>
                    </div>
                    <span className="rounded-lg bg-purple-100 px-3 py-2 text-xs font-bold text-purple-700">
                        {request.timeLeft}
                    </span>
                </article>
            ))}
        </div>
    );
}
