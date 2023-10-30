import React, { useRef, useState } from 'react';
import ChevronLeft from '../assets/icons/ChevronLeft'; // Update the path to your chevron icons
import ChevronRight from '../assets/icons/ChevronRight'; // Update the path to your chevron icons
import useFullScreenToggle from '../hooks/useToggleFullscreen';
import FullScreenImage from './common/FullScreenImage';

const ImageSlider = ({ images }: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { isFullScreen, toggleFullScreen } = useFullScreenToggle();
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const handlePrevClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    const handleTouchStart = (e: any) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: any) => {
        touchEndX.current = e.changedTouches[0].clientX;
        if (touchEndX.current === null || touchStartX.current === null) return;

        const swipeDistance = touchEndX?.current - touchStartX?.current;

        if (swipeDistance > 0) {
            // Swipe right, go to the previous image
            handlePrevClick(e);
        } else if (swipeDistance < 0) {
            // Swipe left, go to the next image
            handleNextClick(e);
        }
    };

    return (
        <div className='flex card items-center'>
            <button className="transform -translate-y-1/2" onClick={handlePrevClick}>
                <ChevronLeft />
            </button>
            <div className="relative flex justify-center" onClick={toggleFullScreen} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img
                    src={images[currentImageIndex]}
                    alt={`${currentImageIndex + 1}`}
                    className="w-2/3 p-2 max-h-96 object-contain"
                />
            </div>
            <button className="transform -translate-y-1/2" onClick={handleNextClick}>
                <ChevronRight />
            </button>
            {isFullScreen && <FullScreenImage
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                toggleFullScreen={toggleFullScreen}
                selectedImage={images[currentImageIndex]}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            />}
        </div>
    );
};

export default ImageSlider;
