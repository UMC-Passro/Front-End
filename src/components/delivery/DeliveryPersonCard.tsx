import MessageIcon from "../../assets/icons/MessageIcon";

export const DeliveryPersonCard = () => {
    return (
        <div className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="flex w-10 h-10 rounded-full bg-gray-800"></div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold">감자튀김</span>
                    <span className="text-xs text-gray-500">반포 4동</span>
                </div>
            </div>
            <MessageIcon className="text-gray-400" />
        </div>
    );
};
