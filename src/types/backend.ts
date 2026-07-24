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
    id?: number;
    address?: string;
}

export interface BackendAccountSummary {
    id: number;
    email?: string;
    nickname?: string;
    name?: string;
    phone?: string;
    certified?: boolean;
    point?: number;
    picture?: string;
    role?: "USER" | "ADMIN";
    place_id?: BackendPlace | null;
}
