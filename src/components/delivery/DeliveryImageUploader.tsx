import { useRef, useState } from "react";
import { CameraIcon } from "../../assets/icons/CameraIcon";
import { fileApi } from "../../apis";
import { ApiError } from "../../types/api";

interface UploadedImage {
    imageKey: string;
    previewUrl: string;
}

interface DeliveryImageUploaderProps {
    onChange?: (imageKeys: string[]) => void;
}

export const DeliveryImageUploader = ({
    onChange,
}: DeliveryImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFiles = Array.from(event.target.files ?? []);
        event.target.value = "";

        if (selectedFiles.length === 0) {
            return;
        }
        const remainingCount = 3 - images.length;

        if (remainingCount <= 0) {
            setError("이미지는 최대 3장까지 등록할 수 있습니다.");
            return;
        }
        const files = selectedFiles.slice(0, remainingCount);

        if (files.some((file) => !file.type.startsWith("image/"))) {
            setError("이미지 파일만 선택할 수 있습니다.");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const { imageKey, uploadUrl } =
                        await fileApi.getImageUploadUrl({
                            fileName: file.name,
                            contentType:
                                file.type || "application/octet-stream",
                            fileSize: file.size,
                        });
                    await fileApi.uploadToPresignedUrl(uploadUrl, file);
                    return { imageKey, previewUrl: URL.createObjectURL(file) };
                }),
            );
            setImages((previous) => {
                const nextImages = [...previous, ...uploadedImages];
                onChange?.(nextImages.map((image) => image.imageKey));
                return nextImages;
            });
        } catch (error) {
            setError(
                error instanceof ApiError
                    ? error.message
                    : "이미지를 업로드하지 못했습니다.",
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = (imageKey: string) => {
        setImages((previous) => {
            const removedImage = previous.find(
                (image) => image.imageKey === imageKey,
            );
            if (removedImage) {
                URL.revokeObjectURL(removedImage.previewUrl);
            }
            const nextImages = previous.filter(
                (image) => image.imageKey !== imageKey,
            );
            onChange?.(nextImages.map((image) => image.imageKey));
            return nextImages;
        });
    };

    return (
        <div>
            <div className="flex gap-2">
                {images.map((image) => (
                    <div key={image.imageKey} className="relative h-16 w-16">
                        <img
                            src={image.previewUrl}
                            alt="배송 이미지"
                            className="h-full w-full rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(image.imageKey)}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs text-white"
                            aria-label="이미지 삭제"
                        >
                            ×
                        </button>
                    </div>
                ))}
                {images.length < 3 && (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}
                        className="flex w-16 h-16 px-5 py-3 items-center justify-center bg-gray-50 rounded-lg"
                    >
                        <div className="flex flex-col items-center text-gray-200 gap-0.5">
                            <CameraIcon />
                            <span className="text-gray-300 text-[10px]">
                                {images.length}/3
                            </span>
                        </div>
                    </button>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => void handleImageChange(event)}
                className="sr-only"
            />
            {isUploading && (
                <p className="mt-2 text-xs text-gray-500">
                    이미지를 업로드하는 중입니다...
                </p>
            )}
            {error && (
                <p className="mt-2 text-xs text-errorRed" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
