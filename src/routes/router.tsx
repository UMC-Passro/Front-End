import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DeliveryRequestPage from "../pages/DeliveryRequestPage";
import DeliveryStatusPage from "../pages/DeliveryStatusPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";
import PointPage from "../pages/PointPage";
import { HistoryStatsPage } from "../pages/HistoryStatsPage";
import UserStateChoice from "../pages/UserStateChoice";
import HomePage from "../pages/HomePage";
import DeliveryMatchingPage from "../pages/DeliveryMatchingPage";
import DeliveryTrackingPage from "../pages/DeliveryTrackingPage";
import EditProfile from "../pages/EditProfile";
import ChatPage from "../pages/ChatPage";

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
                element: <UserStateChoice />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
        ],
    },
    {
        path: "/mypage",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <MyPage /> },
            { path: "edit", element: <EditProfile /> },
            {
                path: "point",
                element: <PointPage />,
            },
            {
                path: "history",
                element: <HistoryStatsPage />,
            },
        ],
    },
    {
        path: "/delivery",
        element: <ProtectedRoute />,
        children: [
            {
                path: "matching",
                element: <DeliveryMatchingPage />,
            },
            {
                path: "request",
                element: <DeliveryRequestPage />,
            },
            {
                path: "tracking",
                element: <DeliveryTrackingPage />,
            },
            {
                path: "status",
                element: <DeliveryStatusPage />,
            },
            {
                path: "chat",
                element: <ChatPage />,
            },
        ],
    },
]);
