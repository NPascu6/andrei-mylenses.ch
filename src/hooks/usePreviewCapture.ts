import {useEffect} from 'react';

const allowedPreviewOrigins = new Set([
    'https://pascu.io',
    'https://www.pascu.io',
    'http://localhost:3000',
    'http://localhost:5173',
]);

interface PreviewCaptureRequest {
    type: 'pascu-preview:capture';
    requestId: string;
}

const isPreviewCaptureRequest = (data: unknown): data is PreviewCaptureRequest =>
    Boolean(
        data
        && typeof data === 'object'
        && 'type' in data
        && 'requestId' in data
        && (data as PreviewCaptureRequest).type === 'pascu-preview:capture'
        && typeof (data as PreviewCaptureRequest).requestId === 'string',
    );

export const usePreviewCapture = () => {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleMessage = async (event: MessageEvent) => {
            if (!allowedPreviewOrigins.has(event.origin) || !isPreviewCaptureRequest(event.data)) {
                return;
            }

            try {
                const {default: html2canvas} = await import('html2canvas');
                const canvas = await html2canvas(document.body, {
                    backgroundColor: null,
                    useCORS: true,
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                    scrollX: window.scrollX,
                    scrollY: window.scrollY,
                });

                event.source?.postMessage(
                    {
                        type: 'pascu-preview:screenshot',
                        requestId: event.data.requestId,
                        dataUrl: canvas.toDataURL('image/png'),
                    },
                    {targetOrigin: event.origin},
                );
            } catch {
                event.source?.postMessage(
                    {
                        type: 'pascu-preview:screenshot-error',
                        requestId: event.data.requestId,
                    },
                    {targetOrigin: event.origin},
                );
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
};
