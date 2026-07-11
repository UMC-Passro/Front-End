import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DeliveryRequestPage from "../pages/DeliveryRequestPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";
import PointPage from "../pages/PointPage";
import { HistoryStatsPage } from "../pages/HistoryStatsPage";

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
                path: "signup",
                element: <SignupPage />,
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
        ],
    },
]);
