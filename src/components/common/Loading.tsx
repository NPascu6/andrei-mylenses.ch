const Loading = () => {
    return (
        <div
            className="flex justify-center items-center min-h-[10em]"
            role="status"
            aria-label="Loading..."
        >
            <div
                className="h-12 w-12 animate-spin rounded-full border-4"
                style={{borderColor: 'rgba(var(--accent-color), 0.2)', borderTopColor: 'var(--color-nav)'}}
            />
        </div>
    );
};

export default Loading;
