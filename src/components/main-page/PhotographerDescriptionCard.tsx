import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Loading from "../common/Loading";
import ImageSlider from "../common/ImageSlider";


interface PhotographerDescriptionCardProps {
    artistImage: string;
}


const PhotographerDescriptionCard: React.FC<PhotographerDescriptionCardProps> = ({
                                                                                     artistImage,
                                                                                 }) => {
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
    const photos = useSelector((state: RootState) => state.app.photos);
    const imageSources: string[] =
        photos?.map((photo: { src: string }) => photo.src) || [];

    // Theme-based classes.
    const cardBg = isDarkTheme ? "bg-gray-800" : "bg-white";
    const cardText = isDarkTheme ? "text-gray-200" : "text-gray-800";
    const shadowClass =
        "shadow-xl hover:shadow-2xl transition-shadow duration-300";

    return (
        <div className={`p-1 flex flex-col md:flex-row gap-2 ${cardText}`}>
            {/* Artist Description */}
            <div
                className={`${shadowClass} ${cardBg} rounded-lg flex flex-row md:flex-row w-full`}
            >

                <div className="flex flex-col justify-center p-2 w-2/3">
                    <h2 className="text-xl font-semibold text-left p-1">
                        Capturing Life's Unforgettable Moments
                    </h2>
                    <div className="p-1 rounded-lg">
                        Fueled by an insatiable curiosity to capture every fleeting detail, I believe
                        each second holds the potential to become a masterpiece
                    </div>
                </div>

                <div className="flex justify-center items-center p-2 w-1/3">
                    <img
                        loading="lazy"
                        src={artistImage}
                        alt="Artist portrait"
                        className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-gray-700"
                    />
                </div>
            </div>

            {/* Mobile-Only Image Slider */}
            <div className="w-full">
                {imageSources.length > 0 && (
                    <Suspense fallback={<Loading/>}>
                        <div className="flex justify-center items-center">
                            <ImageSlider images={imageSources}/>
                        </div>
                    </Suspense>
                )}
            </div>

            {/* Photographer's Journey */}
            <div
                className={`${shadowClass} ${cardBg} text-sm rounded-lg p-2 w-full`}
            >
                My journey began in the mystical heart of Transylvania, Romania—a land of foggy forests
                and ancient castles where myth meets reality. It was there that my passion for capturing
                nature’s raw beauty was born.
                <br/>
                <br/>
                After dedicating over 25 years to professional basketball as both a player and a coach,
                and nearly a decade navigating the dynamic corporate world, I realized that life is fleeting and
                every moment deserves to be immortalized.
                Photography became my gateway to freeze time, capturing the spirit and emotion of life's
                most candid moments.
                <br/>
                <br/>
                Every frame tells a story, whether it’s the subtle smile of a stranger, the grandeur of nature,
                or the vibrant pulse of urban life. My goal is to preserve these moments, inviting you to
                pause and savor the beauty of the present.
            </div>
        </div>
    );
};

export default PhotographerDescriptionCard;
