import CloseIcon from "../../assets/icons/CloseIcon";
import ChevronLeft from '../../assets/icons/ChevronLeft'; // Update the path to your chevron icons
import ChevronRight from '../../assets/icons/ChevronRight'; // Update the path to your chevron icons

const FullScreenImage = ({ handlePrevClick, handleNextClick, toggleFullScreen, selectedImage, onTouchStart, onTouchEnd }: any) => {
    return (
        <div
            id="full-screen-photo"
            className="flex fixed top-0 left-0 w-full h-full bg-black z-50 items-center justify-center"
            onClick={toggleFullScreen}
        >
            <div className='flex items-center'>
                {handlePrevClick && <span className="transform -translate-y-1/2" onClick={handlePrevClick}>
                    <ChevronLeft />
                </span>}
                <div className="flex p-2"
                    onTouchStart={onTouchStart && onTouchStart}
                    onTouchEnd={onTouchEnd && onTouchEnd}>
                    {/* Full-screen image */}
                    <img
                        style={{ maxHeight: '70vh', maxWidth: '87vw' }}
                        src={selectedImage}
                        alt={selectedImage}
                    />
                </div>
                {handleNextClick && <span className="transform -translate-y-1/2" onClick={handleNextClick}>
                    <ChevronRight />
                </span>}
            </div>

            <span className="absolute top-2 right-2 cursor-pointer text-white" onClick={toggleFullScreen}>
                <CloseIcon />
            </span>

        </div>
    );

}

export default FullScreenImage;