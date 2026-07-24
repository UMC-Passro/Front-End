import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { DELIVERY_FILTER, DeliveryStatus } from "../../../types/delivery";

interface DeliveryItem {
    id: number;
    name: string;
    status: DeliveryStatus;
    start?: string;
    end?: string;
    date?: string;
}

interface DeliveryListProps {
    items: DeliveryItem[];
}

export const DeliveryList = ({ items }: DeliveryListProps) => {
    return (
        <div className="mt-6 flex w-full flex-col gap-3.5">
            {items.map((delivery) => {
                const statusLabel =
                    delivery.status === "DELIVERING"
                        ? DELIVERY_FILTER.DELIVERING.label
                        : DELIVERY_FILTER.COMPLETED.label;
                return (
                    <div
                        key={delivery.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-5 py-4"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">{delivery.name}</div>

                            {delivery.status === "DELIVERING" ? (
                                <div className="flex items-center text-sm font-semibold text-gray-500">
                                    <div>{delivery.start}</div>
                                    <ArrowIcon />
                                    <div>{delivery.end}</div>
                                </div>
                            ) : (
                                <div className="text-sm font-semibold text-gray-500">
                                    {delivery.date}
                                </div>
                            )}
                        </div>

                        <div
                            className={`flex items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold text-white ${
                                delivery.status === "DELIVERING"
                                    ? "bg-purple-600"
                                    : "bg-gray-300"
                            }`}
                        >
                            {statusLabel}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
