export type UserRole = "sender" | "shipper";

export type ProfilePlace = {
    id: number;
    region: string;
    routeName: string;
    stationName: string;
    latitude: number;
    longitude: number;
};

export type Profile = {
    picture?: string;
    nickname: string;
    name: string;
    birth: string;
    phoneNumber: string;
    deliveryCount: number;
    point: number;
    rating: number;
    startPlace: ProfilePlace;
    destinationPlace: ProfilePlace;
};

export type EditProfile = {
    nickname: string;
    phoneNumber: string;
    startPlaceId: number;
    destinationPlaceId: number;
    wayPoints?: number[];
    name: string;
    birth: string;
};

export type EditPassword = {
    password: string;
    code: string;
};
