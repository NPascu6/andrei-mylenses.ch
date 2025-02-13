import React from 'react';

const CloseIcon = React.lazy(() => import('../../assets/icons/CloseIcon'));
const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));

interface FullScreenImageProps {
    handlePrevClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    handleNextClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    toggleFullScreen: (e?: React.MouseEvent | React.TouchEvent) => void;
    selectedImage: string;
    onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
                                                             handlePrevClick,
                                                             handleNextClick,
                                                             toggleFullScreen,
                                                             selectedImage,
                                                             onTouchStart,
                                                             onTouchEnd,
                                                         }) => {
    return (
        <div
            id="full-screen-photo"
            className="flex fixed inset-0 bg-black z-50 items-center justify-center transition-opacity duration-300"
            onClick={toggleFullScreen}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen image view"
        >
            {/* Inner container stops propagation so that clicking inside doesn't close the modal */}
            <div
                className="flex items-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                {handlePrevClick && (
                    <span
                        className="transform -translate-y-1/2 cursor-pointer text-white p-2"
                        onClick={handlePrevClick}
                        aria-label="Previous image"
                    >
            <ChevronLeft/>
          </span>
                )}

                <div
                    className="flex p-2"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <img
                        loading="lazy"
                        src={selectedImage}
                        alt="Full screen view"
                        style={{maxHeight: '70vh', maxWidth: '83vw'}}
                        className="rounded-lg object-contain"
                    />
                </div>

                {handleNextClick && (
                    <span
                        className="transform -translate-y-1/2 cursor-pointer text-white p-2"
                        onClick={handleNextClick}
                        aria-label="Next image"
                    >
            <ChevronRight/>
          </span>
                )}
            </div>

            <span
                className="absolute top-2 right-2 cursor-pointer text-white p-2"
                onClick={toggleFullScreen}
                aria-label="Close full screen view"
            >
        <CloseIcon/>
      </span>
        </div>
    );
};

export default FullScreenImage;
