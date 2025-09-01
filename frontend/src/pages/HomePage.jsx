import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
    );
};
export default HomePage;
