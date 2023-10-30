import React from "react";
import useFullScreenToggle from "../../hooks/useToggleFullscreen";
import FullScreenImage from "../common/FullScreenImage";

const PhotographerDescriptionCard = ({ artistImage, firstPhoto, secondPhoto }: any) => {
    const { isFullScreen, toggleFullScreen } = useFullScreenToggle();

    return (
        <div className="p-4 flex flex-col md:flex-col text-center">
            <div className="flex shadow-xl rounded-lg card">
                <div className="w-2/3">
                    <h2 className="text-xl font-semibold text-center flex flex-col justify-center items-center">
                        <p className="text-lg mb-2 pb-3 card rounded-lg p-2">
                            Fueled by an insatiable curiosity for capturing the essence of unique moments, I firmly believe that each second holds the potential for creating a remarkable image.
                        </p>
                    </h2>
                </div>
                <div className="w-1/3 mt-2 mr-2">
                    <img
                        src={artistImage}
                        alt={artistImage}
                        className="rounded-full"
                    />
                </div>
            </div>
            <div className="w-full h-full mt-2 mb-2" onClick={toggleFullScreen}>
                <img
                    src={firstPhoto}
                    alt={firstPhoto}
                    className="rounded-lg shadow-xl"
                />
            </div>

            <div className="rounded-lg shadow-xl pb-3 card p-2">
                <p className="mb-4">
                    My journey began in the heart of Transylvania, Romania, a land shrouded in misty forests and guarded by enigmatic castles, where legends often blur the line between reality and myth. It's here that my unyielding passion for nature and the great outdoors was born.
                </p>
                <p className="mb-4">
                    Having dedicated over 25 years to the world of professional basketball, both as a player and a coach, and now nearing a decade in the fast-paced corporate world, I've come to realize that both sports and corporate life are in a fast forward mode.
                </p>
                <p className="mb-4">
                    This realization led me to the next chapter in my life, where I began channeling my energy into creating moments where time stops: photography.
                </p>
                <p className="mb-4">
                    Why photography? Because photography compels us to pause and observe the world around us. Whether it's the beauty of people, animals, landscapes, or architecture, there are moments that simply demand our attention. My goal is to capture these moments and freeze the time. With the click of the camera button.
                </p>
            </div>
            <div className="w-full h-full mt-2" onClick={toggleFullScreen}>
                <img
                    src={secondPhoto}
                    alt={secondPhoto}
                    className="rounded-lg shadow-xl"
                />
            </div>
            {isFullScreen && <FullScreenImage toggleFullScreen={toggleFullScreen} selectedImage={firstPhoto} />}
        </div>
    );
}

export default PhotographerDescriptionCard;
