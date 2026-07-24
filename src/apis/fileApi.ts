import axios from "axios";
import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const fileApi = {
    getUploadUrl(fileName: string) {
        return apiRequest<string>({
            method: "GET",
            url: API_ENDPOINTS.file.upload(fileName),
        });
    },

    getDownloadUrl(fileName: string) {
        return apiRequest<string>({
            method: "GET",
            url: API_ENDPOINTS.file.download(fileName),
        });
    },

    async upload(uploadUrl: string, file: File) {
        await axios.put(uploadUrl, file, {
            headers: {
                "Content-Type": file.type || "application/octet-stream",
            },
        });
    },
};
