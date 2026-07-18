import { CameraIcon } from "../../assets/icons/CameraIcon";

export const DeliveryImageUploader = () => {
    return (
        <div className="flex w-16 h-16 px-5 py-3 items-center justify-center bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center text-gray-200 gap-0.5">
                <CameraIcon />
                <span className="text-gray-300 text-[10px]">0/3</span>
            </div>
        </div>
    );
};
