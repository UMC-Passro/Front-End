const ACCESS_TOKEN_KEY = "passro.accessToken";

export const tokenStorage = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
};
