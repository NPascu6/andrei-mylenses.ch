import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Loading from "../common/Loading";
import ImageSlider from "../common/ImageSlider";

const PrintFeatures: React.FC = () => {
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

    // Define dynamic classes based on the dark theme flag.
    const headingColor = isDarkTheme ? "text-gray-200" : "text-gray-800";
    const borderColor = isDarkTheme ? "border-gray-600" : "border-gray-300";
    const listTextColor = isDarkTheme ? "text-gray-300" : "text-gray-700";
    const photos = useSelector((state: RootState) => state.app.photos);
    const canvasPhotos = useSelector((state: RootState) => state.app.canvasPhotos);

    const imageSources: string[] =
        photos?.map((photo: { src: string }) => photo.src) || [];
    const canvasSources: string[] =
        canvasPhotos?.map((photo: { src: string }) => photo.src) || [];

    return (
        <section className="p-2">
            <h2
                className={`text-2xl font-bold ${headingColor} border-t-2 border-b-2 pt-2 pb-2 ${borderColor}`}
            >
                What Sets My Prints Apart
            </h2>
            <ul className={`list-disc space-y-2 ${listTextColor} md:grid md:grid-cols-3 md:gap-1`}>
                <li className={`space-y-2 border text-center items-center justify-center flex p-1 flex-wrap mt-2 ${listTextColor}`}>
                    <span className="font-bold">Giclee Printing</span> Our prints are created using a cutting-edge
                    Giclee printing process renowned for exceptional color accuracy, sharpness, and longevity. Every
                    print is a true-to-life reproduction that captures the finest details of the original photograph.
                </li>
                <li className={`space-y-2 border text-center items-center justify-center flex p-1 flex-wrap ${listTextColor}`}>
                    <span className="font-bold">Canvas Quality</span> We utilize premium, museum-grade canvas to give
                    your prints an authentic, tactile feel. The rich texture of the canvas adds depth and dimension,
                    elevating the overall aesthetic appeal of each piece.
                </li>
                <div className="w-full">
                    {imageSources.length > 0 && (
                        <Suspense fallback={<Loading/>}>
                            <div className="flex justify-center items-center">
                                <ImageSlider images={imageSources}/>
                            </div>
                        </Suspense>
                    )}
                </div>
                <li className={`space-y-2 border text-center items-center justify-center flex p-1 flex-wrap ${listTextColor}`}>
                    <span className="font-bold">Vibrant Colors</span> Our prints burst with vivid, true-to-life colors
                    that bring every scene to life. Each photograph pops with brilliance, ensuring your space is filled
                    with dynamic, eye-catching art.
                </li>
                <li className={`space-y-2 border text-center items-center justify-center flex p-1 flex-wrap ${listTextColor}`}>
                    <span className="font-bold">Handcrafted Precision</span> Every print is meticulously handcrafted,
                    thoroughly inspected, and handled with utmost care. This dedication to detail guarantees that you
                    receive a product of the highest quality.
                </li>
                <div className="w-full">
                    {canvasSources.length > 0 && (
                        <Suspense fallback={<Loading/>}>
                            <div className="flex justify-center items-center">
                                <ImageSlider images={canvasSources}/>
                            </div>
                        </Suspense>
                    )}
                </div>
            </ul>
        </section>
    );
};

export default PrintFeatures;
