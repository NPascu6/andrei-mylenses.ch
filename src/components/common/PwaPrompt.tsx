import React, {useEffect} from 'react';
import {
    activateWaitingServiceWorker,
    serviceWorkerStatusEventName,
    type ServiceWorkerStatus,
    type ServiceWorkerStatusEventDetail,
} from '../../pwa/registerServiceWorker';

const PwaPrompt = () => {
    const [status, setStatus] = React.useState<ServiceWorkerStatus | null>(null);

    useEffect(() => {
        const handleStatusChange = (event: Event) => {
            const {detail} = event as CustomEvent<ServiceWorkerStatusEventDetail>;
            setStatus(detail.status);
        };

        window.addEventListener(serviceWorkerStatusEventName, handleStatusChange);

        return () => {
            window.removeEventListener(serviceWorkerStatusEventName, handleStatusChange);
        };
    }, []);

    useEffect(() => {
        if (status !== 'offline-ready') {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setStatus(null);
        }, 4000);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [status]);

    if (!status) {
        return null;
    }

    const dismissPrompt = () => {
        setStatus(null);
    };

    return (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-70 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2">
            <div
                aria-live={status === 'need-refresh' ? 'assertive' : 'polite'}
                className="pointer-events-auto rounded-[1.6rem] border border-white/10 bg-[rgba(20,16,16,0.96)] p-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur"
                role={status === 'need-refresh' ? 'alert' : 'status'}
            >
                <p className="text-sm font-semibold tracking-[0.02em]">
                    {status === 'need-refresh' ? 'A new version of the gallery is ready.' : 'The gallery is ready for offline use.'}
                </p>
                <p className="mt-1 text-sm text-white/75">
                    {status === 'need-refresh'
                        ? 'Refresh to load the latest photos, content, and cached assets.'
                        : 'Visited pages and images will now load more reliably on repeat visits.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    {status === 'need-refresh' ? (
                        <button
                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-950 transition-transform duration-200 hover:scale-[1.02]"
                            onClick={() => void activateWaitingServiceWorker()}
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
                        {status === 'need-refresh' ? 'Later' : 'Dismiss'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PwaPrompt;
