import { DeliveryStatus } from "../../types/delivery";

interface DeliveryProgressProps {
    status: DeliveryStatus;
}

export const DeliveryProgress = ({ status }: DeliveryProgressProps) => {
    const isPickup = status === "WAITING_PICKUP";
    const isDelivering = status === "DELIVERING";
    const isCompleted = status === "COMPLETED";

    const ProgressCircle = ({
        isActive,
        isPassed,
    }: {
        isActive: boolean;
        isPassed: boolean;
    }) => {
        if (isActive) {
            return (
                <div className="relative flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-purple-100" />
                    <div className="absolute h-2.5 w-2.5 rounded-full bg-purple-500" />
                </div>
            );
        }

        return (
            <div
                className={`mt-1 h-4 w-4 rounded-full ${isPassed ? "bg-gray-800" : "bg-gray-100"}`}
            />
        );
    };

    return (
        <div className="mt-10 flex w-full">
            <div className="flex flex-col items-center gap-2">
                <ProgressCircle
                    isActive={isPickup}
                    isPassed={isDelivering || isCompleted}
                />
                <span
                    className={`text-sm ${
                        isPickup ? "text-purple-600" : "text-gray-600"
                    }`}
                >
                    물건 픽업
                </span>
            </div>

            <div
                className={`mt-2.5 h-0.5 flex-1 ${
                    isDelivering || isCompleted ? "bg-gray-800" : "bg-gray-100"
                }`}
            />

            <div className="flex flex-col items-center gap-2">
                <ProgressCircle
                    isActive={isDelivering}
                    isPassed={isCompleted}
                />
                <span
                    className={`text-sm ${
                        isDelivering ? "text-purple-600" : "text-gray-600"
                    }`}
                >
                    배송중
                </span>
            </div>

            <div
                className={`mt-2.5 h-0.5 flex-1 ${
                    isCompleted ? "bg-gray-800" : "bg-gray-100"
                }`}
            />

            <div className="flex flex-col items-center gap-2">
                <ProgressCircle isActive={isCompleted} isPassed={false} />
                <span
                    className={`text-sm ${
                        isCompleted ? "text-purple-600" : "text-gray-600"
                    }`}
                >
                    배송 완료
                </span>
            </div>
        </div>
    );
};
