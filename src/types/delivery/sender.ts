import {
    BackendDeliveryLogType,
    BackendDeliveryState,
    BackendPlace,
} from "../backend";

export type SenderDeliveryListItem = {
    deliveryId: number;
    goodName: string;
    originAddress: string;
    destAddress: string;
    status: BackendDeliveryState;
};

export type CreateDeliveryRequest = {
    originAddress: string;
    destAddress: string;
    name: string;
    price: number;
    size: "S" | "M" | "L" | string;
    picture?: string;
    memo?: string;
};

export type SenderDeliveryDetail = {
    id: number;
    status: BackendDeliveryState;
    shipperInfo: {
        name?: string;
        picture?: string;
        place?: BackendPlace | null;
    } | null;
    deliveryTimeLine: Array<{
        id: number;
        type: BackendDeliveryLogType;
        createdAt: string;
    }>;
};

export type DeliveryPayment = {
    id: number;
    basePoint: number;
    distancePoint: number;
    weightPoint: number;
    totalPoint: number;
};
