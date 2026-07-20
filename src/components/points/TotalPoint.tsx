interface TotalPointProps {
    total: number;
}
export const TotalPoint = ({ total }: TotalPointProps) => {
    return (
        <div className="flex flex-col mt-9 w-full rounded-xl px-6 py-5 gap-5 bg-gradient-to-r from-[#636DFF] to-[#4541EB]">
            <div className="flex flex-col gap-1.5">
                <div className="font-semibold text-sm text-purple-200">
                    보유 포인트
                </div>
                <div className="font-bold text-2xl text-white">
                    {total.toLocaleString()}P
                </div>
            </div>
            <div className="flex items-center justify-center w-full px-2.5 py-2 rounded-lg bg-purple-100 text-purple-700 font-semibold">
                + 충전하기
            </div>
        </div>
    );
};
