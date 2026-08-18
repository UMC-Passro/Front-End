import { useEffect, useState } from "react";
import { fileApi } from "../../apis";

interface ChatMessageImageProps {
    imageKey: string;
    alt: string;
    borderRadiusClassName?: string;
}

export default function ChatMessageImage({
    imageKey,
    alt,
    borderRadiusClassName = "rounded-[18px]",
}: ChatMessageImageProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCanceled = false;

        setImageUrl(null);
        setHasError(false);

        void fileApi
            .getImageDownloadUrl(imageKey)
            .then((url) => {
                if (!isCanceled) {
                    setImageUrl(url);
                }
            })
            .catch(() => {
                if (!isCanceled) {
                    setHasError(true);
                }
            });

        return () => {
            isCanceled = true;
        };
    }, [imageKey]);

    if (hasError) {
        return (
            <div
                className={`flex h-28 w-44 items-center justify-center bg-gray-100 px-4 text-center text-xs font-medium text-gray-400 ${borderRadiusClassName}`}
                role="img"
                aria-label={alt}
            >
                이미지를 불러오지 못했습니다.
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div
                className={`h-28 w-44 animate-pulse bg-gray-100 ${borderRadiusClassName}`}
                aria-label="채팅 이미지 불러오는 중"
                role="status"
            />
        );
    }

    return (
        <img
            src={imageUrl}
            alt={alt}
            className={`block max-h-[280px] max-w-full object-cover ${borderRadiusClassName}`}
        />
    );
}
