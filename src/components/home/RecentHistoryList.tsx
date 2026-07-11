import type { RecentHistory } from "../../types/home";

type RecentHistoryListProps = {
  histories: RecentHistory[];
};

export function RecentHistoryList({ histories }: RecentHistoryListProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 min-[390px]:gap-3">
      {histories.map((history) => (
        <article
          key={history.id}
          className="flex min-h-[50px] items-center justify-between gap-3 rounded-lg bg-[#F8F8FF] px-4 py-3 min-[390px]:min-h-[78px] min-[390px]:px-7"
        >
          <div className="min-w-0">
            <h3 className="truncate text-[11px] font-extrabold text-[#303139] min-[390px]:text-base">
              {history.title}
            </h3>
            <p className="mt-1 text-[9px] font-semibold text-[#A2A5B4] min-[390px]:text-sm">
              {history.date}
            </p>
          </div>
          <span className="rounded-md bg-[#C7C9D4] px-3 py-2 text-[9px] font-extrabold text-white min-[390px]:text-sm">
            {history.status}
          </span>
        </article>
      ))}
    </div>
  );
}
