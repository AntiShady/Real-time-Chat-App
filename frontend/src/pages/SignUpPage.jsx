import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim())
            return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6)
            return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-200">
            <div className="w-full max-w-md p-6 border border-gray-700 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h1>
                <p className="text-gray-400 text-center mb-6">
                    Get started with your free account
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg outline-none focus:border-gray-500"
                            placeholder="Your Name"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    </div>

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
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? "Loading..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignUpPage;
