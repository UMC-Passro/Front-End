import type { ActiveDelivery } from "../../types/home";

type ActiveDeliveryCardProps = {
  delivery: ActiveDelivery;
};

export function ActiveDeliveryCard({ delivery }: ActiveDeliveryCardProps) {
  return (
    <article className="mt-3 flex min-h-[73px] items-center justify-between gap-3 rounded-lg bg-[#DFDFFF] px-4 py-4 min-[390px]:mt-4 min-[390px]:min-h-[126px] min-[390px]:rounded-xl min-[390px]:px-7 min-[390px]:py-7">
      <div className="min-w-0">
        <h3 className="truncate text-[13px] font-extrabold text-black min-[390px]:text-xl">
          {delivery.title}
        </h3>
        <p className="mt-2 text-[11px] font-semibold text-[#8488FF] min-[390px]:text-base">
          {delivery.route}
        </p>
      </div>
      <span className="rounded-lg bg-[#6663F6] px-3 py-2 text-[10px] font-extrabold text-white shadow-sm min-[390px]:px-4 min-[390px]:py-3 min-[390px]:text-sm">
        {delivery.status}
      </span>
    </article>
  );
}
