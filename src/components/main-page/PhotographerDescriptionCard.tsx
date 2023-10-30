import React from "react";

const PhotographerDescriptionCard = ({ artistImage }: any) => {
    return (
        <div className="p-4 rounded-md shadow-xl flex flex-col md:flex-row text-center">
            <div className="md:w-2/3 mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-3 text-center flex flex-col justify-center items-center">
                    <div className="md:hidden mb-4">
                        <img
                            src={artistImage}
                            alt="Artist's Face"
                            className="w-1/2 mx-auto rounded-full"
                        />
                    </div>
                    <p className="text-xl mb-4 border-b-2 pb-3">
                        Fueled by an insatiable curiosity for capturing the essence of unique moments, I firmly believe that each second holds the potential for creating a remarkable image.
                    </p>
                </h2>
                <div className="rounded-lg shadow-xl pb-3">
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
            </div>
            <div className="md:w-1/3 hidden md:block">
                <img
                    src={artistImage}
                    alt="Artist's Face"
                    className="rounded-full"
                />
            </div>
        </div>
    );
}

export default PhotographerDescriptionCard;
