import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-200">
            <div className="w-full max-w-md p-6 border border-gray-700 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-center mb-6">
                    Sign in to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg outline-none focus:border-gray-500"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg outline-none focus:border-gray-500"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? "Loading..." : "Sign in"}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default LoginPage;
