import {
    BackendAccountSummary,
    BackendDeliveryState,
    BackendPlace,
} from "../backend";

export type ShipperDelivery = {
    id: number;
    senderInfo: BackendAccountSummary;
    shipperInfo: BackendAccountSummary | null;
    originPlace: BackendPlace | null;
    destPlace: BackendPlace | null;
    deliveryState: BackendDeliveryState;
    memo?: string;
};
