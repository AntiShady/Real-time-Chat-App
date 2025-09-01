import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <Link to="/" className="text-xl font-bold text-gray-200">
                Chat-App
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    to="/settings"
                    className="text-sm text-gray-400 hover:text-white"
                >
                    Settings
                </Link>
                {authUser && (
                    <>
                        <Link
                            to="/profile"
                            className="text-sm text-gray-400 hover:text-white"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="text-sm text-gray-400 hover:text-white"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};
export default Navbar;
