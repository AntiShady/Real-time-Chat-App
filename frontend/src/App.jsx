import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div
            data-theme={theme}
            className="bg-gray-900 text-gray-200 min-h-screen"
        >
            <Navbar />
            <div className="mt-16">
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? <HomePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !authUser ? <SignUpPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !authUser ? <LoginPage /> : <Navigate to="/" />
                        }
                    />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route
                        path="/profile"
                        element={
                            authUser ? (
                                <ProfilePage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
            <Toaster />
        </div>
    );
};
export default App;
