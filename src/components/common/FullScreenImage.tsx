import CloseIcon from "../../assets/icons/CloseIcon";

const FullScreenImage = ({ toggleFullScreen, selectedImage }: any) => {
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

export default FullScreenImage;