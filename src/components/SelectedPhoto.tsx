import CloseIcon from "./icons/CloseIcon";
import { useEffect, useState } from "react";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";
import Contact from "./common/Contact";

const SelectedPhoto = ({ selectedImage, setSelectedImage, previouseSelectedImage, nextSelectedImage, images, index, setPreviousSelectedImage, setNextSelectedImage, setIndex }: any) => {
    const [selectedSize, setSelectedSize] = useState('16x20');
    const [isFullScreen, setFullScreen] = useState(false);

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

    const toggleFullScreen = () => {
        setFullScreen(!isFullScreen);
    };

    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isFullScreen]);

    if (isFullScreen) {
        return (
            <div
                id="full-screen-photo"
                className="flex fixed top-0 left-0 w-full h-full bg-black z-50 items-center justify-center"
                onClick={toggleFullScreen}
            >
                <div className="flex p-2 w-full flex ">
                    {/* Full-screen image */}
                    <img
                        src={selectedImage}
                        alt={selectedImage}
                        className="max-w-full max-h-full"
                    />

                </div>
                <span className="absolute top-2 right-2 cursor-pointer text-white" onClick={toggleFullScreen}>
                    <CloseIcon />
                </span>
            </div>
        );
    }

    return <div id="selected-photo" className={`fixed top-16 left-2 w-5/6 flex items-start justify-center bg-opacity-90 rounded`}>
        <div className="rounded-lg shadow-lg flex flex-col md:flex-row select-none">
            <div>
                <div className="flex align-center justify-between">
                    <div className="flex align-center justify-between w-full">
                        <div className="p-3 cursor-pointer" onClick={() => {
                            setIndex(index - 1);
                            setPreviousSelectedImage(images[index - 2]);
                            setNextSelectedImage(images[index + 2]);
                            setSelectedImage(previouseSelectedImage.default)
                        }}>
                            <ChevronLeft />
                        </div>
                        <div className="flex align-center justify-between">
                            <h2 className="text-md font-semibold text-center select-none pt-2">
                                {getTitle(selectedImage)}
                            </h2>
                        </div>
                        <div className="p-3 cursor-pointer" onClick={() => {
                            setIndex(index + 1);
                            setPreviousSelectedImage(images[index - 2]);
                            setNextSelectedImage(images[index + 2]);
                            setSelectedImage(nextSelectedImage.default)
                        }}>
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
                    src={selectedImage}
                    alt={selectedImage}
                    onClick={toggleFullScreen}
                    className="max-w-70% select-none p-1"
                />
            </div>
            <div className="rounded-lg shadow-lg">
                <PhotoCanvasDetails />
            </div>
        </div>
    </div>;
}

export default SelectedPhoto;