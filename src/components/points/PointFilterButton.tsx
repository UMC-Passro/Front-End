export const PointFilterButton = () => {
    return (
        <div className="flex gap-2 mt-8">
            <button className="flex px-3 py-2.5 bg-gray-900 rounded-md text-white text-xs font-semibold">
                전체
            </button>
            <button className="flex px-3 py-2.5 border border-gray-200 rounded-md text-gray-800 text-xs font-semibold">
                적립
            </button>
            <button className="flex px-3 py-2.5 border border-gray-200 rounded-md text-gray-800 text-xs font-semibold">
                사용
            </button>
            <button className="flex px-3 py-2.5 border border-gray-200 rounded-md text-gray-800 text-xs font-semibold">
                소멸
            </button>
        </div>
    );
};
