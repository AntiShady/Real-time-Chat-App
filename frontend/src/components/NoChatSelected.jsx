const NoChatSelected = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold text-gray-200">
                Welcome to Chat-App!
            </h2>
            <p className="text-gray-400 mt-2">
                Select a conversation from the sidebar to start chatting.
            </p>
        </div>
    );
};

export default NoChatSelected;
