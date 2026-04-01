import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Loading from "../common/Loading";
import ImageSlider from "../common/ImageSlider";

const PrintFeatures: React.FC = () => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const canvasPhotos = useSelector((state: RootState) => state.app.canvasPhotos);

    const imageSources: string[] =
        photos?.map((photo: { src: string }) => photo.src) || [];
    const canvasSources: string[] =
        canvasPhotos?.map((photo: { src: string }) => photo.src) || [];

    return (
        <section className="p-2">
            <h2 className="border-y-2 py-2 text-2xl font-bold text-appText" style={{borderColor: 'var(--color-line)'}}>
                What Sets My Prints Apart
            </h2>
            <ul className="text-muted-token space-y-2 md:grid md:grid-cols-3 md:gap-1">
                <li className="surface-panel-soft mt-2 flex flex-wrap items-center justify-center rounded-lg p-3 text-center">
                    <span className="font-bold">Giclee Printing</span> Our prints are created using a cutting-edge
                    Giclee printing process renowned for exceptional color accuracy, sharpness, and longevity. Every
                    print is a true-to-life reproduction that captures the finest details of the original photograph.
                </li>
                <li className="surface-panel-soft flex flex-wrap items-center justify-center rounded-lg p-3 text-center">
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
                <li className="surface-panel-soft flex flex-wrap items-center justify-center rounded-lg p-3 text-center">
                    <span className="font-bold">Vibrant Colors</span> Our prints burst with vivid, true-to-life colors
                    that bring every scene to life. Each photograph pops with brilliance, ensuring your space is filled
                    with dynamic, eye-catching art.
                </li>
                <li className="surface-panel-soft flex flex-wrap items-center justify-center rounded-lg p-3 text-center">
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
