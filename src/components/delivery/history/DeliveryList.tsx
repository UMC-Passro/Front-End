import ArrowIcon from "../../../assets/icons/ArrowIcon";

const deliveryList = [
    {
        id: 1,
        title: "무인양품 티셔츠",
        start: "안양",
        end: "정왕역",
        status: "배송중",
    },
    {
        id: 2,
        title: "코알라 티셔츠",
        date: "26.06.26",
        status: "배송완료",
    },
    {
        id: 3,
        title: "프로그래밍 전공책",
        date: "26.06.20",
        status: "배송완료",
    },
    {
        id: 4,
        title: "선러브 모자",
        date: "26.04.06",
        status: "배송완료",
    },
    {
        id: 5,
        title: "오렌지",
        date: "26.04.01",
        status: "배송완료",
    },
];

export const DeliveryList = () => {
    return (
        <div className="mt-6 flex w-full flex-col gap-3.5">
            {deliveryList.map((delivery) => (
                <div
                    key={delivery.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-5 py-4"
                >
                    <div className="flex flex-col gap-1">
                        <div className="font-bold">{delivery.title}</div>

                        {delivery.status === "배송중" ? (
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
                            delivery.status === "배송중"
                                ? "bg-[#5A60F9]"
                                : "bg-gray-300"
                        }`}
                    >
                        {delivery.status}
                    </div>
                </div>
            ))}
        </div>
    );
};
