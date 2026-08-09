import type { ReactNode } from "react";
import type { UserRole } from "../../types/user";
import { RoleAvatar } from "./RoleAvatar";

type HomeHeaderProps = {
    name: string;
    headline: string;
    role: UserRole;
    avatarUrl?: string | null;
    isRoleChanging?: boolean;
    onRoleChange: (role: UserRole) => void;
    actions?: ReactNode;
};

export function HomeHeader({
    name,
    headline,
    role,
    avatarUrl,
    isRoleChanging = false,
    onRoleChange,
    actions,
}: HomeHeaderProps) {
    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-xl font-bold tracking-normal">
                    안녕하세요, {name}님!
                    <br />
                    {headline}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                    <RoleAvatar
                        role={role}
                        avatarUrl={avatarUrl}
                        disabled={isRoleChanging}
                        onRoleChange={onRoleChange}
                    />
                    {actions}
                </div>
            </div>
        </div>
    );
}
