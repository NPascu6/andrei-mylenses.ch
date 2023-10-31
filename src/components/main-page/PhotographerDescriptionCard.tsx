import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ImageSlider = React.lazy(() => import('../common/ImageSlider'));

const PhotographerDescriptionCard = ({ artistImage }: any) => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const imageSources = photos?.map((photo: any) => photo.default);

    return (
        <div className="p-2 flex flex-col md:flex-col text-center">
            <div className="flex shadow-xl rounded-lg card">
                <div className="w-2/3 flex  align-center">
                    <h2 className="flex  align-center text-xl font-semibold text-start flex-col justify-center items-center">
                        <p className="text-lg mb-2 pb-3 card rounded-lg p-6">
                            Fueled by an insatiable curiosity for capturing the essence of unique moments, I firmly believe that each second holds the potential for creating a remarkable image.
                        </p>
                    </h2>
                </div>
                <div className="w-1/3 mt-2 mr-2">
                    <img
                        loading="lazy"
                        src={artistImage}
                        alt={artistImage}
                        className="rounded-full"
                    />
                </div>
            </div>
            <div className="w-full h-full mt-2 mb-2">
                {photos?.length > 0 && <div className="flex justify-center items-center">
                    <ImageSlider images={imageSources} />
                </div>}
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
            <div className="w-full h-full mt-2">
                {photos?.length > 0 && <div className="flex justify-center items-center">
                    <ImageSlider images={imageSources} />
                </div>}
            </div>
        </div>
    );
}

export default PhotographerDescriptionCard;
