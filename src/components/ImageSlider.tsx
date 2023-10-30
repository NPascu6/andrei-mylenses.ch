import React, { useState } from 'react';
import ChevronLeft from '../assets/icons/ChevronLeft'; // Update the path to your chevron icons
import ChevronRight from '../assets/icons/ChevronRight'; // Update the path to your chevron icons
import useFullScreenToggle from '../hooks/useToggleFullscreen';
import FullScreenImage from './common/FullScreenImage';

const ImageSlider = ({ images }: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { isFullScreen, toggleFullScreen } = useFullScreenToggle();
    const selectedImage = images[currentImageIndex];

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className='flex card items-center'>
            <button className="transform -translate-y-1/2" onClick={handlePrevClick}>
                <ChevronLeft />
            </button>
            <div className="relative flex justify-center" onClick={toggleFullScreen}>
                <img
                    src={images[currentImageIndex]}
                    alt={`${currentImageIndex + 1}`}
                    className="w-2/3 p-2 max-h-96 object-contain"
                />
            </div>
            <button className="transform -translate-y-1/2" onClick={handleNextClick}>
                <ChevronRight />
            </button>
            {isFullScreen && <FullScreenImage toggleFullScreen={toggleFullScreen} selectedImage={selectedImage} />}
        </div>
    );
};

export default ImageSlider;
