type FeedbackModalProps = {
  message: string;
  onClose: () => void;
};

export default function FeedbackModal({
  message,
  onClose,
}: FeedbackModalProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 px-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full rounded-[14px] bg-white px-5 py-6 text-center shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[16px] font-bold leading-[24px] text-[#202126]">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 h-11 w-full rounded-[9px] bg-purple-600 text-[15px] font-bold text-white transition-colors hover:bg-purple-500"
        >
          확인
        </button>
      </div>
    </div>
  );
}

