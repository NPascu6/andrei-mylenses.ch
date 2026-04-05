import React, {useCallback, useEffect, useState} from 'react';
import {useSwipeNavigation} from '../../hooks/useSwipeNavigation';
import ExpandableImage from './ExpandableImage';

const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));

interface ImageSliderProps {
    images: string[];
    autoSlideTimeout?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({images, autoSlideTimeout = 4000}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(
        () => (images.length ? Math.floor(Math.random() * images.length) : 0)
    );
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

    const {handleTouchStart, handleTouchEnd} = useSwipeNavigation({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrevious,
    });

    useEffect(() => {
        if (!images.length) {
            return;
        }

        const autoSlideInterval = setInterval(() => {
            goToNext();
        }, autoSlideTimeout);
        return () => clearInterval(autoSlideInterval);
    }, [autoSlideTimeout, goToNext, images.length]);

    useEffect(() => {
        if (currentImageIndex < images.length) {
            return;
        }

        setCurrentImageIndex(0);
    }, [currentImageIndex, images.length]);

    if (!images.length) {
        return null;
    }

    return (
        <div
            className="surface-panel flex min-w-full items-center justify-center rounded-lg transition-colors duration-300"
        >
            <button
                type="button"
                className="theme-link flex -translate-y-1/2 cursor-pointer p-2"
                onClick={goToPrevious}
                aria-label="Previous slide"
            >
                <ChevronLeft/>
            </button>

            <div
                className="flex justify-center rounded-lg"
                style={{height: '15em', maxHeight: '15em', minHeight: '15em'}}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <ExpandableImage
                    presentation="balanced"
                    src={images[currentImageIndex]}
                    modalSrc={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    containerClassName="flex h-full w-full justify-center overflow-hidden rounded-lg"
                    imgClassName="h-full w-full rounded-lg object-contain p-1"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    modalHandlePrevClick={goToPrevious}
                    modalHandleNextClick={goToNext}
                    modalOnTouchStart={handleTouchStart}
                    modalOnTouchEnd={handleTouchEnd}
                    orderDetails={undefined}
                />
            </div>

            <button
                type="button"
                className="theme-link flex -translate-y-1/2 cursor-pointer p-2"
                onClick={goToNext}
                aria-label="Next slide"
            >
                <ChevronRight/>
            </button>
        </div>
    );
};

export default React.memo(ImageSlider);
