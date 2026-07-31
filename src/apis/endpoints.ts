export const API_ENDPOINTS = {
    auth: {
        sendMail: "/auth/mail/send",
        confirmMail: "/auth/mail/confirm",
        signup: "/auth/signup",
        login: "/auth/login",
        logout: "/auth/logout",
        reissue: "/auth/reissue",
        findId: "/auth/find/id",
        findPassword: "/auth/find/password",
    },
    subway: {
        search: "/subway/search",
    },
    sender: {
        root: "/sender",
        detail: (deliveryId: number) => `/sender/${deliveryId}`,
        payment: (deliveryId: number) => `/sender/${deliveryId}/payment`,
        complete: (deliveryId: number) => `/sender/${deliveryId}/complete`,
        terms: (deliveryId: number) => `/sender/${deliveryId}/terms`,
        cancel: (deliveryId: number) => `/sender/${deliveryId}/cancel`,
    },
    shipper: {
        matched: "/shipper/matched",
        root: "/shipper/",
        detail: (deliveryId: number) => `/shipper/${deliveryId}/`,
        acceptMatch: (deliveryId: number) =>
            `/shipper/${deliveryId}/matched`,
        acquire: (deliveryId: number) => `/shipper/${deliveryId}/acquire`,
        confirm: (deliveryId: number) => `/shipper/${deliveryId}/confirm`,
    },
    file: {
        upload: (fileName: string) =>
            `/file/${encodeURIComponent(fileName)}/upload`,
        download: (fileName: string) =>
            `/file/${encodeURIComponent(fileName)}/download`,
    },
    review: {
        root: "/reviews",
        average: (userId: number) => `/reviews/average/${userId}`,
    },
    inquiry: {
        root: "/inquiry",
        byDelivery: (deliveryId: number) => `/inquiry/${deliveryId}`,
    },
} as const;
