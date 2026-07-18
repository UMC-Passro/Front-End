import type { UserRole } from "../../types/user";
import { RoleAvatar } from "./RoleAvatar";

type HomeHeaderProps = {
    name: string;
    headline: string;
    role: UserRole;
};

export function HomeHeader({ name, headline, role }: HomeHeaderProps) {
    return (
        <header className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold tracking-normal">
                안녕하세요, {name}님!
                <br />
                {headline}
            </h1>
            <RoleAvatar role={role} />
        </header>
    );
}
