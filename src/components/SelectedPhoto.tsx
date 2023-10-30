import CloseIcon from "../assets/icons/CloseIcon";
import { useRef, useState } from "react";
import ChevronLeft from "../assets/icons/ChevronLeft";
import ChevronRight from "../assets/icons/ChevronRight";
import Contact from "./common/Contact";
import useFullScreenToggle from "../hooks/useToggleFullscreen";
import FullScreenImage from "./common/FullScreenImage";

const SelectedPhoto = ({ selectedImage, setSelectedImage, previouseSelectedImage, nextSelectedImage, images, index, setPreviousSelectedImage, setNextSelectedImage, setIndex }: any) => {
    const [selectedSize, setSelectedSize] = useState('16x20');
    const { isFullScreen, toggleFullScreen } = useFullScreenToggle();
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const handlePrevClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setIndex(index - 1);
        setPreviousSelectedImage(images[index - 2]);
        setNextSelectedImage(images[index + 2]);
        setSelectedImage(previouseSelectedImage?.default)
    }

    const handleNextClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setIndex(index + 1);
        setPreviousSelectedImage(images[index - 2]);
        setNextSelectedImage(images[index + 2]);
        setSelectedImage(nextSelectedImage?.default)
    }

    const handleTouchStart = (e: any) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: any) => {
        touchEndX.current = e.changedTouches[0].clientX;
        if (touchEndX.current === null || touchStartX.current === null) return;

        const swipeDistance = touchEndX?.current - touchStartX?.current;

        if (swipeDistance > 0) {
            // Swipe right, go to the previous image
            handlePrevClick(e)
        } else if (swipeDistance < 0) {
            // Swipe left, go to the next image
            handleNextClick(e)
        }
    };

    const handleSizeChange = (e: any) => {
        setSelectedSize(e.target.value);
    }

    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }

    const PhotoCanvasDetails = () => {
        return (
            <div id='photo-canvas-details' className="rounded shadow-lg p-2" style={{ minWidth: '7em' }}>
                <div className="mb-2 flex justify-between">
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <div className="text-lg font-semibold">{selectedSize === '90x60' ? '60' : '40'} CHF</div>
                    </div>
                </div>
                <label className="text-sm font-medium mb-2">Size</label>
                <select
                    onChange={handleSizeChange}
                    className="py-2 px-2 border rounded-md w-full"
                    value={selectedSize}
                >
                    <option value="50x30">50x30cm</option>
                    <option value="90x60">90x60cm</option>
                </select>
                <Contact />
            </div>
        );
    };

    return <div id="selected-photo" className={`fixed top-1 left-2 w-5/6 flex items-start justify-center bg-opacity-90 rounded`}>
        <div className="rounded-lg shadow-lg flex flex-col md:flex-row select-none">
            <div>
                <div className="flex align-center justify-between">
                    <div className="flex align-center justify-between w-full">
                        <div className="p-3 cursor-pointer" onClick={handlePrevClick}>
                            <ChevronLeft />
                        </div>
                        <div className="flex align-center justify-between">
                            <h2 className="text-md font-semibold text-center select-none pt-2">
                                {getTitle(selectedImage)}
                            </h2>
                        </div>
                        <div className="p-3 cursor-pointer" onClick={handleNextClick}>
                            <ChevronRight />
                        </div>
                    </div>
                    <div>
                        <span className="flex justify-center align-center p-2" onClick={() => {
                            setSelectedImage(null)
                        }}>
                            <CloseIcon />
                        </span>
                    </div>
                </div>
                <img
                    onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
                    src={selectedImage}
                    alt={selectedImage}
                    onClick={toggleFullScreen}
                    className="max-w-70% select-none p-1"
                />
            </div>
            <div className="rounded-lg shadow-lg">
                <PhotoCanvasDetails />
            </div>

            {isFullScreen && <FullScreenImage
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                toggleFullScreen={toggleFullScreen}
                selectedImage={selectedImage}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd} />}
        </div>
    </div>;
}

export default SelectedPhoto;