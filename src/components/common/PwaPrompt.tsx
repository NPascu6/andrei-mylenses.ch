import React, {useEffect} from 'react';
import {useRegisterSW} from 'virtual:pwa-register/react';

const PwaPrompt = () => {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisterError(error: unknown) {
            console.error('Service worker registration failed.', error);
        },
    });

    useEffect(() => {
        if (!offlineReady || needRefresh) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setOfflineReady(false);
        }, 4000);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [needRefresh, offlineReady, setOfflineReady]);

    if (!needRefresh && !offlineReady) {
        return null;
    }

    const dismissPrompt = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] w-[min(32rem,calc(100%-2rem))] -translate-x-1/2">
            <div
                aria-live={needRefresh ? 'assertive' : 'polite'}
                className="pointer-events-auto rounded-[1.6rem] border border-white/10 bg-[rgba(20,16,16,0.96)] p-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur"
                role={needRefresh ? 'alert' : 'status'}
            >
                <p className="text-sm font-semibold tracking-[0.02em]">
                    {needRefresh ? 'A new version of the gallery is ready.' : 'The gallery is ready for offline use.'}
                </p>
                <p className="mt-1 text-sm text-white/75">
                    {needRefresh
                        ? 'Refresh to load the latest photos, content, and cached assets.'
                        : 'Visited pages and images will now load more reliably on repeat visits.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    {needRefresh ? (
                        <button
                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-950 transition-transform duration-200 hover:scale-[1.02]"
                            onClick={() => void updateServiceWorker(true)}
                            type="button"
                        >
                            Refresh now
                        </button>
                    ) : null}
                    <button
                        className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:border-white/35 hover:text-white"
                        onClick={dismissPrompt}
                        type="button"
                    >
                        {needRefresh ? 'Later' : 'Dismiss'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PwaPrompt;
