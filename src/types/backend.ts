export type BackendDeliveryState =
    | "WAIT"
    | "MATCHED"
    | "DELIVERING"
    | "CONFIRM_REQUESTED"
    | "DELIVERED"
    | "CANCEL";

export type BackendDeliveryLogType =
    | "SEND_REQUEST"
    | "MATCHED"
    | "PICKED_UP"
    | "DELIVERED"
    | "DONE"
    | "CANCELED";

export interface BackendPlace {
    createdAt: string;
    updatedAt: string;
    id: number;
    subwayRouteName: string;
    subwayStationName: string;
}

export interface BackendDeliveryPartyInfo {
    name: string;
    picture: string | null;
    place: BackendPlace | null;
}

export interface BackendDeliveryLogInfo {
    id: number;
    type: BackendDeliveryLogType;
    image: string | null;
    createdAt: string;
}
