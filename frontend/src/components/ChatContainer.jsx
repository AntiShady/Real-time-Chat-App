import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [
        selectedUser,
        getMessages,
        subscribeToMessages,
        unsubscribeFromMessages,
    ]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!selectedUser) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-gray-400">
                    Select a user to start chatting.
                </p>
            </div>
        );
    }

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={message._id}
                        className={`flex ${
                            message.senderId === authUser._id
                                ? "justify-end text-right"
                                : "justify-start text-left"
                        }`}
                        ref={
                            index === messages.length - 1 ? messageEndRef : null
                        }
                    >
                        <div className="flex flex-col">
                            <div className="text-sm text-gray-400">
                                {formatMessageTime(message.createdAt)}
                            </div>
                            <div
                                className={`p-2 rounded-lg mt-1
                  ${
                      message.senderId === authUser._id
                          ? "bg-blue-600"
                          : "bg-gray-700"
                  }`}
                            >
                                {message.text && <p>{message.text}</p>}
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="max-w-xs mt-1 rounded-md"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="text-center text-gray-500">
                        Say hi to start the conversation!
                    </div>
                )}
            </div>
            <MessageInput />
        </div>
    );
};
export default ChatContainer;
