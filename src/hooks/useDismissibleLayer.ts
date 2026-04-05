import {useEffect, type RefObject} from 'react';

export const useDismissibleLayer = (
    ref: RefObject<HTMLElement | null>,
    isOpen: boolean,
    onDismiss: () => void,
) => {
    useEffect(() => {
        if (!isOpen || typeof document === 'undefined' || typeof window === 'undefined') {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (ref.current?.contains(event.target as Node)) {
                return;
            }

            onDismiss();
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onDismiss();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onDismiss, ref]);
};
