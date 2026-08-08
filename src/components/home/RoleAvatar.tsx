import type { UserRole } from "../../types/user";

type RoleAvatarProps = {
    role: UserRole;
    avatarUrl?: string | null;
    disabled?: boolean;
    onRoleChange: (role: UserRole) => void;
};

function HouseIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
                d="M3.5 10.5 12 3l8.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-5v6H5a1.5 1.5 0 0 1-1.5-1.5v-9Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DeliveryIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
                d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Zm0 0 8 4.5m8-4.5L12 12m0 9v-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function RoleAvatar({
    role,
    avatarUrl,
    disabled = false,
    onRoleChange,
}: RoleAvatarProps) {
    const isShipper = role === "shipper";
    const currentRoleLabel = isShipper ? "배송자" : "요청자";
    const nextRole: UserRole = isShipper ? "sender" : "shipper";
    const nextRoleLabel = isShipper ? "요청자" : "배송자";

    return (
        <div className="flex shrink-0 flex-col items-end gap-1.5">
            <button
                type="button"
                role="switch"
                aria-checked={isShipper}
                aria-label={`현재 ${currentRoleLabel} 모드. ${nextRoleLabel} 모드로 전환`}
                disabled={disabled}
                onClick={() => onRoleChange(nextRole)}
                className={`relative h-[50px] w-[100px] overflow-hidden rounded-full border p-1 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 ${
                    isShipper
                        ? "border-purple-200 bg-purple-100 text-purple-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                }`}
            >
                <span
                    className={`absolute top-1/2 -translate-y-1/2 ${
                        isShipper ? "right-3" : "left-3"
                    }`}
                >
                    {isShipper ? <HouseIcon /> : <DeliveryIcon />}
                </span>
                <span
                    className={`absolute left-1 top-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white bg-white shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
                        isShipper ? "translate-x-0" : "translate-x-[50px]"
                    }`}
                >
                    <img
                        src={avatarUrl || "/Logo.png"}
                        alt=""
                        className={`h-full w-full ${
                            avatarUrl ? "object-cover" : "object-contain p-1"
                        }`}
                    />
                </span>
            </button>
            <span
                className="pr-1 text-xs font-bold text-gray-700"
                aria-live="polite"
            >
                {currentRoleLabel} 모드
            </span>
        </div>
    );
}
