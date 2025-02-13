const Loading = () => {
    return (
        <div
            className="flex justify-center items-center min-h-[10em]"
            role="status"
            aria-label="Loading..."
        >
            <div className="w-12 h-12 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
