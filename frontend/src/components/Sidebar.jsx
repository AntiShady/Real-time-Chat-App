import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
        useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    return (
        <aside className="w-1/4 p-4 border-r border-gray-700 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-gray-200">
                    Contacts
                </h2>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                    Online Only
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        className="w-4 h-4"
                    />
                </label>
            </div>
            <div className="mt-4">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`flex items-center gap-3 p-2 w-full text-left
              ${
                  selectedUser?._id === user._id
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
              }`}
                    >
                        <div className="relative">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.fullName}
                                className="w-10 h-10 rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="w-2 h-2 bg-green-500 rounded-full absolute bottom-0 right-0"></span>
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-gray-200">
                                {user.fullName}
                            </div>
                            <div className="text-sm text-gray-400">
                                {onlineUsers.includes(user._id)
                                    ? "Online"
                                    : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
                {filteredUsers.length === 0 && (
                    <div className="text-center text-gray-500 mt-4">
                        No users found.
                    </div>
                )}
            </div>
        </aside>
    );
};
export default Sidebar;
