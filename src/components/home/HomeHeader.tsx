import type { UserRole } from "../../types/user";
import { RoleAvatar } from "./RoleAvatar";

type HomeHeaderProps = {
    name: string;
    headline: string;
    role: UserRole;
    avatarUrl?: string | null;
    isRoleChanging?: boolean;
    onRoleChange: (role: UserRole) => void;
};

export function HomeHeader({
    name,
    headline,
    role,
    avatarUrl,
    isRoleChanging = false,
    onRoleChange,
}: HomeHeaderProps) {
    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-xl font-bold tracking-normal">
                    안녕하세요, {name}님!
                    <br />
                    {headline}
                </p>
                <RoleAvatar
                    role={role}
                    avatarUrl={avatarUrl}
                    disabled={isRoleChanging}
                    onRoleChange={onRoleChange}
                />
            </div>
        </div>
    );
}
