export type ServiceWorkerStatus = 'offline-ready' | 'need-refresh';

export interface ServiceWorkerStatusEventDetail {
    status: ServiceWorkerStatus;
}

export const serviceWorkerStatusEventName = 'app:service-worker-status';

const emitServiceWorkerStatus = (status: ServiceWorkerStatus) => {
    window.dispatchEvent(
        new CustomEvent<ServiceWorkerStatusEventDetail>(serviceWorkerStatusEventName, {
            detail: {status},
        }),
    );
};

export const activateWaitingServiceWorker = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    registration?.waiting?.postMessage({type: 'SKIP_WAITING'});
};

export const registerServiceWorker = () => {
    if (!import.meta.env.PROD || typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return;
    }

    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    let isRefreshing = false;

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register(swUrl);

            if (registration.waiting) {
                emitServiceWorkerStatus('need-refresh');
            }

            registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;
                if (!installingWorker) {
                    return;
                }

                installingWorker.addEventListener('statechange', () => {
                    if (installingWorker.state !== 'installed') {
                        return;
                    }

                    if (navigator.serviceWorker.controller) {
                        emitServiceWorkerStatus('need-refresh');
                        return;
                    }

                    emitServiceWorkerStatus('offline-ready');
                });
            });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (isRefreshing) {
                    return;
                }

                isRefreshing = true;
                window.location.reload();
            });
        } catch (error) {
            console.error('Service worker registration failed.', error);
        }
    });
};
