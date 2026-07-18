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
                <p className="font-semibold text-gray-900">{message}</p>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-5 w-full py-3.5 rounded-lg bg-purple-500 font-semibold text-white transition-colors hover:bg-purple-600"
                >
                    확인
                </button>
            </div>
        </div>
    );
}
