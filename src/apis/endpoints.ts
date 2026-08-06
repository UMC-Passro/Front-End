export const API_ENDPOINTS = {
    auth: {
        sendMail: "/auth/mail/send",
        confirmMail: "/auth/mail/confirm",
        confirmUniversityMail: "/auth/mail/confirm/University",
        signup: "/auth/signup",
        login: "/auth/login",
        logout: "/auth/logout",
        reissue: "/auth/reissue",
        findId: "/auth/find/id",
        findPassword: "/auth/find/password",
        availableNickname: "/auth/nickname/check"
    },
    subway: {
        search: "/subway/search",
        path: "/subway/routes/shortest"
    },
    sender: {
        root: "/sender",
        detail: (deliveryId: number) => `/sender/${deliveryId}`,
        shipperLocation: (deliveryId: number) =>
            `/sender/${deliveryId}/shipper-location`,
        payment: "/sender/payment",
        complete: (deliveryId: number) => `/sender/${deliveryId}/complete`,
        terms: (deliveryId: number) => `/sender/${deliveryId}/terms`,
        cancel: (deliveryId: number) => `/sender/${deliveryId}/cancel`,
    },
    shipper: {
        matched: "/shipper/matched",
        root: "/shipper/",
        location: "/shipper/location",
        detail: (deliveryId: number) => `/shipper/${deliveryId}/`,
        acceptMatch: (deliveryId: number) =>
            `/shipper/${deliveryId}/matched`,
        acquire: (deliveryId: number) => `/shipper/${deliveryId}/acquire`,
        confirm: (deliveryId: number) => `/shipper/${deliveryId}/confirm`,
    },
    file: {
        imageUploadUrl: "/file/image/upload-url",
        imageDownloadUrl: "/file/image/download-url",
    },
    review: {
        root: "/reviews",
        average: (userId: number) => `/reviews/average/${userId}`,
    },
    inquiry: {
        root: "/inquiry",
    },
    deliveryInquiry: {
        root: "/delivery-inquiry",
        byDelivery: (deliveryId: number) =>
            `/delivery-inquiry/${deliveryId}`,
    },
    account: {
        senderMyPage: "/mypage/sender",
        shipperMyPage: "/mypage/shipper",
        editMyInfo: "/mypage/edit/myInfo",
        sendPasswordEditMail: "/mypage/edit/password/mail",
        editPassword: "/mypage/edit/password",
        points: "/account/points",
    },
    chat: {
        messages: (deliveryId: number) =>
            `/chat/${deliveryId}/messages`,
        info: (deliveryId: number) => `/chat/${deliveryId}/info`,
        unreadCount: (deliveryId: number) =>
            `/chat/${deliveryId}/unread-count`,
    },
} as const;
