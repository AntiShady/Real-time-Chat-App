import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    if (!selectedUser) {
        return null;
    }

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt={`${selectedUser.fullName}'s avatar`}
                        className="w-10 h-10 rounded-full"
                    />
                    {onlineUsers.includes(selectedUser._id) && (
                        <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-gray-900"></div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                        {selectedUser.fullName}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {onlineUsers.includes(selectedUser._id)
                            ? "Online"
                            : "Offline"}
                    </p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)}>
                <X size={24} className="text-gray-400 hover:text-white" />
            </button>
        </div>
    );
};

export default ChatHeader;
