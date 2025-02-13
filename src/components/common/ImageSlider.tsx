import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import useFullScreenToggle from '../../hooks/useToggleFullscreen';

const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));
const FullScreenImage = React.lazy(() => import('./FullScreenImage'));

interface ImageSliderProps {
    images: string[];
    autoSlideTimeout?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({images, autoSlideTimeout = 4000}) => {
    // Initialize the slider with a random image index.
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(
        () => Math.floor(Math.random() * images.length)
    );
    const {isFullScreen, toggleFullScreen} = useFullScreenToggle();

    // Refs for swipe support.
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Get dark theme flag from Redux.
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

    // Define dynamic classes based on theme.
    const containerBg = isDarkTheme ? 'bg-gray-800' : 'bg-white';
    const iconColor = isDarkTheme ? 'text-gray-300' : 'text-gray-700';
    const borderColor = isDarkTheme ? 'border-gray-600' : 'border-gray-300';

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

    // Mouse click handlers.
    const handlePrevClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        e.preventDefault();
        goToPrevious();
    };

    const handleNextClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        e.preventDefault();
        goToNext();
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
            goToNext();
        }, autoSlideTimeout);
        return () => clearInterval(autoSlideInterval);
    }, [autoSlideTimeout, goToNext]);

    return (
        <div
            className={`flex card items-center rounded-lg shadow-xl justify-center min-w-full ${containerBg} transition-colors duration-300`}
        >
            {/* Previous Arrow */}
            <span
                className={`transform -translate-y-1/2 cursor-pointer ${iconColor} p-2`}
                onClick={handlePrevClick}
            >
        <ChevronLeft/>
      </span>

            {/* Image Display */}
            <div
                className="relative flex justify-center rounded-lg cursor-pointer"
                style={{height: '15em', maxHeight: '15em', minHeight: '15em'}}
                onClick={toggleFullScreen}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    loading="lazy"
                    src={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    className={`w-full rounded-lg object-contain p-1 ${borderColor}`}
                />
            </div>

            {/* Next Arrow */}
            <span
                className={`transform -translate-y-1/2 cursor-pointer ${iconColor} p-2`}
                onClick={handleNextClick}
            >
        <ChevronRight/>
      </span>

            {/* Full-Screen Modal */}
            {isFullScreen && (
                <FullScreenImage
                    handlePrevClick={handlePrevClick}
                    handleNextClick={handleNextClick}
                    toggleFullScreen={toggleFullScreen}
                    selectedImage={images[currentImageIndex]}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                />
            )}
        </div>
    );
};

export default React.memo(ImageSlider);
