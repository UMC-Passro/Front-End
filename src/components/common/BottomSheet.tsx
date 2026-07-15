import type { ReactNode } from "react";

interface BottomSheetProps {
  title: string;
  titleAlign?: "center" | "left";
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

export default function BottomSheet({ title, titleAlign = "center", children, footer, onClose }: BottomSheetProps) {
  return (
    <div className="absolute inset-0 z-20 bg-black/20" onClick={onClose}>
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[30px] bg-white px-5 pb-8 pt-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto h-1 w-[55px] rounded-full bg-[#DADCE6]" aria-hidden="true" />
        <h2
          id="bottom-sheet-title"
          className={`mt-10 text-[18px] font-bold leading-[22px] text-[#1D1E23] ${
            titleAlign === "center" ? "text-center" : "text-left"
          }`}
        >
          {title}
        </h2>
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
}
