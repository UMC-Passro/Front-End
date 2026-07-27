import type { UserRole } from "../../types/user";
import { RoleAvatar } from "./RoleAvatar";

type HomeHeaderProps = {
    name: string;
    headline: string;
    role: UserRole;
};

export function HomeHeader({ name, headline, role }: HomeHeaderProps) {
    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-xl font-bold tracking-normal">
                    안녕하세요, {name}님!
                    <br />
                    {headline}
                </p>
                <RoleAvatar role={role} />
            </div>
        </div>
    );
}
