import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DeliveryConsentPage from "../pages/DeliveryConsentPage";
import DeliveryRequestPage from "../pages/DeliveryRequestPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";
import PointPage from "../pages/PointPage";
import { HistoryStatsPage } from "../pages/HistoryStatsPage";
import UserStateChoice from "../pages/UserStateChoice";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "user-state-choice",
                element: <UserStateChoice />
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
            {
                path: "home",
                element: <HomePage />
            },
        ],
    },
    {
        path: "/mypage",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <MyPage /> },
            {
                path: "point",
                element: <PointPage />,
            },
            {
                path: "history",
                element: <HistoryStatsPage />,
            },
            {
                path: "delivery/request",
                element: <DeliveryRequestPage />,
            },
            {
                path: "delivery/consent",
                element: <DeliveryConsentPage />,
            },
        ],
    },
]);
