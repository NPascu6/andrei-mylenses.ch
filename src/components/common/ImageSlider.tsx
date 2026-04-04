import React, {useCallback, useEffect, useRef, useState} from 'react';
import ExpandableImage from './ExpandableImage';

const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));

interface ImageSliderProps {
    images: string[];
    autoSlideTimeout?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({images, autoSlideTimeout = 4000}) => {
    // Initialize the slider with a random image index.
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(
        () => Math.floor(Math.random() * images.length)
    );

    // Refs for swipe support.
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Helper functions for navigation (navigation works regardless of full-screen state).
    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    }, [images.length]);

    const handlePrevNavigation = useCallback(() => {
        goToPrevious();
    }, [goToPrevious]);

    const handleNextNavigation = useCallback(() => {
        goToNext();
    }, [goToNext]);

    // Mouse click handlers.
    const handlePrevClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        e.preventDefault();
        handlePrevNavigation();
    };

    const handleNextClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        e.preventDefault();
        handleNextNavigation();
    };

    // Touch event handlers for swipe support.
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.changedTouches[0].clientX;
        if (touchStartX.current === null || touchEndX.current === null) return;

        const swipeDistance = touchEndX.current - touchStartX.current;
        if (swipeDistance > 0) {
            goToPrevious();
        } else if (swipeDistance < 0) {
            goToNext();
        }
        // Reset touch values.
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Auto-slide effect.
    useEffect(() => {
        const autoSlideInterval = setInterval(() => {
            handleNextNavigation();
        }, autoSlideTimeout);
        return () => clearInterval(autoSlideInterval);
    }, [autoSlideTimeout, handleNextNavigation]);

    return (
        <div
            className="surface-panel flex min-w-full items-center justify-center rounded-lg transition-colors duration-300"
        >
            <span
                className="theme-link flex -translate-y-1/2 cursor-pointer p-2"
                onClick={handlePrevClick}
            >
        <ChevronLeft/>
      </span>

            <div
                className="flex justify-center rounded-lg"
                style={{height: '15em', maxHeight: '15em', minHeight: '15em'}}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <ExpandableImage
                    src={images[currentImageIndex]}
                    modalSrc={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    containerClassName="flex h-full w-full justify-center rounded-lg"
                    imgClassName="w-full rounded-lg object-contain p-1"
                    imgStyle={{border: '1px solid var(--color-line)'}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    modalHandlePrevClick={handlePrevNavigation}
                    modalHandleNextClick={handleNextNavigation}
                    modalOnTouchStart={handleTouchStart}
                    modalOnTouchEnd={handleTouchEnd}
                    orderDetails={undefined}
                />
            </div>

            <span
                className="theme-link flex -translate-y-1/2 cursor-pointer p-2"
                onClick={handleNextClick}
            >
        <ChevronRight/>
      </span>
        </div>
    );
};

export default React.memo(ImageSlider);
