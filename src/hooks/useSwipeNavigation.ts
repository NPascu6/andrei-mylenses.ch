import {useRef, type TouchEventHandler} from 'react';

interface SwipeNavigationOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
}

export const useSwipeNavigation = ({
    onSwipeLeft,
    onSwipeRight,
    threshold = 40,
}: SwipeNavigationOptions) => {
    const touchStartX = useRef<number | null>(null);

    const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd: TouchEventHandler<HTMLElement> = (event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;

        touchStartX.current = null;

        if (startX === null || endX === undefined) {
            return;
        }

        const swipeDistance = endX - startX;

        if (swipeDistance <= -threshold) {
            onSwipeLeft?.();
            return;
        }

        if (swipeDistance >= threshold) {
            onSwipeRight?.();
        }
    };

    return {
        handleTouchStart,
        handleTouchEnd,
    };
};
