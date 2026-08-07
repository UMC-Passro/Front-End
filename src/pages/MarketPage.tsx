import { useCallback, useEffect } from "react";
import { pointApi } from "../apis/pointApi";
import PageHeader from "../components/common/PageHeader";
import { MARKET_PRODUCTS } from "../data/marketProducts";
import { useApiRequest } from "../hooks/useApiRequest";
import type { MarketProduct } from "../types/market";

const pointFormatter = new Intl.NumberFormat("ko-KR");

function ProductCard({
    product,
    currentPoint,
}: {
    product: MarketProduct;
    currentPoint: number;
}) {
    const hasEnoughPoint = currentPoint >= product.requiredPoint;

    return (
        <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div
                className={`flex h-28 items-center justify-center text-5xl ${product.backgroundClass}`}
                role="img"
                aria-label={product.imageLabel}
            >
                {product.image}
            </div>
            <div className="flex flex-1 flex-col p-3.5">
                <h2 className="min-h-10 text-sm font-bold leading-5 text-gray-900">
                    {product.name}
                </h2>
                <span
                    className={`mt-2 self-start rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        hasEnoughPoint
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                    }`}
                >
                    {hasEnoughPoint ? "구매 가능" : "포인트 부족"}
                </span>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
                    {product.description}
                </p>
                <p className="mt-3 text-base font-extrabold text-purple-600">
                    {pointFormatter.format(product.requiredPoint)}P
                </p>
                <button
                    type="button"
                    disabled
                    className="mt-3 w-full cursor-not-allowed rounded-lg bg-gray-100 py-2.5 text-xs font-bold text-gray-500"
                >
                    {hasEnoughPoint ? "구매 준비 중" : "포인트 부족"}
                </button>
            </div>
        </article>
    );
}

export default function MarketPage() {
    const loadPointHistory = useCallback(() => pointApi.getHistory(), []);
    const pointRequest = useApiRequest(loadPointHistory);

    useEffect(() => {
        void pointRequest.execute().catch(() => undefined);
    }, [pointRequest.execute]);

    const currentPoint = pointRequest.data?.currentPoint ?? 0;

    return (
        <main className="page-container flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader title="마켓" className="shrink-0" />

            <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto pb-6">
                {pointRequest.isLoading ? (
                    <div className="mt-5 h-[102px] animate-pulse rounded-xl bg-purple-100" aria-label="보유 포인트를 불러오는 중" />
                ) : pointRequest.error ? (
                    <section className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-5" role="alert">
                        <h2 className="font-bold text-rose-800">포인트를 불러오지 못했습니다</h2>
                        <p className="mt-1 text-sm text-rose-700">잠시 후 다시 시도해주세요.</p>
                        <button
                            type="button"
                            onClick={() => void pointRequest.execute().catch(() => undefined)}
                            className="mt-3 text-sm font-bold text-rose-700 underline"
                        >
                            다시 시도
                        </button>
                    </section>
                ) : (
                    <section className="mt-5 rounded-xl bg-gradient-to-r from-[#636DFF] to-[#4541EB] px-5 py-5 text-white" aria-labelledby="market-point-title">
                        <p id="market-point-title" className="text-sm font-semibold text-purple-100">현재 보유 포인트</p>
                        <p className="mt-1 text-2xl font-extrabold">{pointFormatter.format(currentPoint)}P</p>
                    </section>
                )}

                {!pointRequest.isLoading && !pointRequest.error ? (
                    <>
                        <aside className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs font-medium leading-5 text-amber-800">
                            상품 구매 API가 준비되기 전까지 구매할 수 없으며 포인트는 차감되지 않습니다.
                        </aside>

                        <section className="mt-6" aria-labelledby="market-products-title">
                            <div className="flex items-end justify-between">
                                <h1 id="market-products-title" className="text-lg font-bold text-gray-900">포인트 상품</h1>
                                <span className="text-xs font-medium text-gray-500">총 {MARKET_PRODUCTS.length}개</span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                {MARKET_PRODUCTS.map((product) => (
                                    <ProductCard key={product.id} product={product} currentPoint={currentPoint} />
                                ))}
                            </div>
                        </section>
                    </>
                ) : null}
            </div>
        </main>
    );
}
