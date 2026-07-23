import type { RecentHistory } from "../../types/home";

type RecentHistoryListProps = {
    histories: RecentHistory[];
};

export function RecentHistoryList({ histories }: RecentHistoryListProps) {
    return (
        <div className="mt-3.5 flex flex-col gap-2.5">
            {histories.map((history) => (
                <article
                    key={history.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-5 py-3"
                >
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-gray-800">
                            {history.title}
                        </h3>
                        <p className="mt-0.5 text-xs font-semibold text-gray-500">
                            {history.date}
                        </p>
                    </div>
                    <span className="rounded-lg bg-gray-300 px-3 py-2 text-xs font-bold text-white">
                        {history.status}
                    </span>
                </article>
            ))}
        </div>
    );
}
