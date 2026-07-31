import { apiRequest } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface SubwayStationItem {
    id: number;
    subwayStationName: string;
    subwayRouteName: string;
}

export const subwayApi = {
    search(keyword: string) {
        return apiRequest<SubwayStationItem[]>({
            method: "GET",
            url: API_ENDPOINTS.subway.search,
            params: { keyword },
        });
    },
};
