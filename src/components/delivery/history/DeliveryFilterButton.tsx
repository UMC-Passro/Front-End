export const DeliveryFilterButton = () => {
    return (
        <div className="flex gap-2 mt-8">
            <button className="flex px-3 py-2 bg-gray-900 rounded-md text-white text-xs font-semibold">
                전체
            </button>
            <button className="flex px-3 py-2 border border-gray-200 rounded-md text-gray-800 text-xs font-semibold">
                배송중
            </button>
            <button className="flex px-3 py-2 border border-gray-200 rounded-md text-gray-800 text-xs font-semibold">
                배송완료
            </button>
        </div>
    );
};
