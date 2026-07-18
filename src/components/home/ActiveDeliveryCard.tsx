import { useNavigate } from "react-router-dom";
import type { ActiveDelivery } from "../../types/home";
import { UserRole } from "../../types/user";

type ActiveDeliveryCardProps = {
    delivery: ActiveDelivery;
    role: UserRole;
};

export function ActiveDeliveryCard({
    delivery,
    role,
}: ActiveDeliveryCardProps) {
    const navigate = useNavigate();
    const handleButton = () => {
        if (role == "sender") {
            navigate("/delivery/status");
            return;
        } else {
            navigate("/delivery/tracking");
        }
    };

    return (
        <button
            type="button"
            onClick={handleButton}
            className="mt-3 flex w-full items-center justify-between gap-3 rounded-lg bg-purple-100 px-5 py-4 text-left transition-colors hover:bg-purple-200"
            aria-label={`${delivery.title} 전달 추적 보기`}
        >
            <div className="min-w-0">
                <h3 className="truncate font-bold text-black">
                    {delivery.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-purple-400">
                    {delivery.route}
                </p>
            </div>
            <span className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white shadow-sm">
                {delivery.status}
            </span>
        </button>
    );
}
