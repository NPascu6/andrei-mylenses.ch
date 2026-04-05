import {useEffect} from 'react';

interface OverlayKeyboardNavigationOptions {
    enabled?: boolean;
    onClose?: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}

export const useOverlayKeyboardNavigation = ({
    enabled = true,
    onClose,
    onPrev,
    onNext,
}: OverlayKeyboardNavigationOptions) => {
    useEffect(() => {
        if (!enabled || typeof window === 'undefined') {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && onClose) {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key === 'ArrowLeft' && onPrev) {
                event.preventDefault();
                onPrev();
                return;
            }

            if (event.key === 'ArrowRight' && onNext) {
                event.preventDefault();
                onNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [enabled, onClose, onPrev, onNext]);
};
