const Loading = () => {
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 backdrop-blur-2xl"></div>

            <div className="absolute top-0 left-0 right-0 px-4 py-2 mt-4 mx-4 sm:mx-auto max-w-xl bg-yellow-100 text-yellow-800 rounded shadow text-center text-sm sm:text-base">
                Please wait while the app connects to the server.
                <br />
                <span className="font-medium">
                    Due to free hosting limitations, this may take a few
                    seconds.
                </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
