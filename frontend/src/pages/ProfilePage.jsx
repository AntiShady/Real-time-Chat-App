import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    if (!authUser) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-900 text-gray-200">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-200">
            <div className="w-full max-w-md p-6 border border-gray-700 rounded-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Profile
                </h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                            src={
                                selectedImg ||
                                authUser.profilePic ||
                                "/avatar.png"
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border border-gray-600"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full cursor-pointer
              ${isUpdatingProfile ? "opacity-50" : ""}`}
                        >
                            📷
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                        {isUpdatingProfile
                            ? "Uploading..."
                            : "Click to change photo"}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-400">Full Name</div>
                        <div className="p-2 border border-gray-700 rounded-lg mt-1">
                            {authUser.fullName}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">
                            Email Address
                        </div>
                        <div className="p-2 border border-gray-700 rounded-lg mt-1">
                            {authUser.email}
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Member Since</span>
                        <span>{authUser.createdAt?.split("T")[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;
