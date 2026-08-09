import closeIcon from "../../assets/icons/alarm-close.svg";
import divider from "../../assets/icons/alarm-divider.svg";
import type { NotificationItem } from "../../apis/notificationApi";

interface AlarmPopupProps {
    alarms: NotificationItem[];
    onClearAll: () => void;
    onDismiss: (alarmId: number) => void;
    className?: string;
    isLoading?: boolean;
    errorMessage?: string;
}

function formatAlarmTime(createdAt: string) {
    const createdDate = new Date(createdAt);

    if (Number.isNaN(createdDate.getTime())) {
        return createdAt;
    }

    const now = new Date();
    const elapsedMinutes = Math.floor(
        (now.getTime() - createdDate.getTime()) / 60_000,
    );

    if (elapsedMinutes < 1) {
        return "방금";
    }

    if (elapsedMinutes < 60) {
        return `${elapsedMinutes}분전`;
    }

    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdDate.getDate()).padStart(2, "0");

    return `${month}-${day}`;
}

export default function AlarmPopup({
    alarms,
    onClearAll,
    onDismiss,
    className = "",
    isLoading = false,
    errorMessage,
}: AlarmPopupProps) {
    return (
        <section
            className={`flex max-h-[70dvh] w-[286px] flex-col gap-2.5 rounded-[9px] bg-white p-[15px] shadow-[0_0_4px_rgba(0,0,0,0.1)] ${className}`}
            aria-label="알림 목록"
            role="dialog"
        >
            <div className="flex items-center justify-between text-xs font-semibold leading-[14px]">
                <h2 className="text-gray-600">알림</h2>
                <button
                    type="button"
                    onClick={onClearAll}
                    disabled={alarms.length === 0}
                    className="text-gray-300 transition-colors hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-default disabled:text-gray-200"
                >
                    모두 지우기
                </button>
            </div>

            {isLoading ? (
                <p className="py-4 text-center text-xs font-medium leading-[14px] text-gray-500">
                    알림을 불러오는 중입니다.
                </p>
            ) : errorMessage ? (
                <p
                    className="py-4 text-center text-xs font-medium leading-[14px] text-red-500"
                    role="alert"
                >
                    {errorMessage}
                </p>
            ) : alarms.length === 0 ? (
                <p className="py-4 text-center text-xs font-medium leading-[14px] text-gray-500">
                    새로운 알림이 없습니다.
                </p>
            ) : (
                <ul className="scrollbar-hidden min-h-0 overflow-y-auto">
                    {alarms.map((alarm, index) => (
                        <li key={alarm.notificationId}>
                            {index > 0 ? (
                                <img
                                    src={divider}
                                    alt=""
                                    className="my-2.5 h-px w-full"
                                    aria-hidden="true"
                                />
                            ) : null}

                            <article className="flex flex-col gap-1">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="min-w-0 truncate text-[13px] font-semibold leading-[14px] text-gray-800">
                                        {alarm.title}
                                    </h3>
                                    <div className="flex shrink-0 items-center gap-0.5">
                                        <time
                                            dateTime={alarm.createdAt}
                                            className="text-[10px] font-medium leading-[14px] text-gray-500"
                                        >
                                            {formatAlarmTime(alarm.createdAt)}
                                        </time>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDismiss(alarm.notificationId)
                                            }
                                            className="flex h-[10px] w-[10px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                            aria-label={`${alarm.title} 알림 지우기`}
                                        >
                                            <img
                                                src={closeIcon}
                                                alt=""
                                                className="h-[10px] w-[10px]"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <p className="break-words text-xs font-medium leading-[14px] text-gray-500">
                                    {alarm.content}
                                </p>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
