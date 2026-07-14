import type { MatchingRequest } from "../../types/home";

type MatchingRequestListProps = {
  requests: MatchingRequest[];
};

export function MatchingRequestList({ requests }: MatchingRequestListProps) {
  return (
    <div className="mt-4 flex flex-col gap-3 min-[390px]:mt-5 min-[390px]:gap-4">
      {requests.map((request) => (
        <article
          key={request.id}
          className="flex min-h-[72px] items-center justify-between gap-3 rounded-lg bg-[#F8F8FF] px-4 py-4 min-[390px]:min-h-[88px] min-[390px]:px-7"
        >
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-extrabold text-[#303139] min-[390px]:text-lg">
              {request.title}
            </h3>
            <p className="mt-2 text-[11px] font-semibold text-[#8F92A3] min-[390px]:text-base">
              {request.route}
            </p>
          </div>
          <span className="rounded-lg bg-[#DFDFFF] px-3 py-2 text-[12px] font-extrabold text-[#5F63EF] min-[390px]:px-4 min-[390px]:py-3 min-[390px]:text-base">
            {request.timeLeft}
          </span>
        </article>
      ))}
    </div>
  );
}
