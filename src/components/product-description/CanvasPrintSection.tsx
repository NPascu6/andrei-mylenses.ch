import React from "react";
import ImageSlider from "../../components/common/ImageSlider";
import PrintDetails from "./PrintDetails";
import GallerySection from "./GallerySection";
import PrintFeatures from "./PrintFeatures";
import SizeSelector from "./SizeSelector";
import DescriptionText from "./DescriptionText";
import DigitalCopiesSection from "./DigitalCopiesSection";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ExpandableParagraph from "../common/ExpandableParagraph";

interface CanvasPrintSectionProps {
    loadedCanvasImages: Array<{ src: string }>;
}

const CanvasPrintSection: React.FC<CanvasPrintSectionProps> = ({
                                                                   loadedCanvasImages,
                                                               }) => {

        const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
        const cardBg = isDarkTheme ? "bg-gray-800" : "bg-white";
        const cardText = isDarkTheme ? "text-gray-200" : "text-gray-800";

        return <div className={`p-1 mt-1 rounded-md shadow-xl text-center card ${cardBg} ${cardText}`}>
            <h1 className="text-xl font-semibold">
                Giclee High-Quality Canvas Prints
            </h1>

            {loadedCanvasImages?.length > 0 && (
                <div className="flex justify-center items-center mb-4 md:hidden">
                    <ImageSlider images={loadedCanvasImages.map((i) => i.src)}/>
                </div>
            )}
            <PrintDetails/>
            <GallerySection/>
            <PrintFeatures/>
            <SizeSelector/>
            <ExpandableParagraph><p className={`${cardText} mt-4`}>
                Indulge in timeless elegance with our premium Giclee canvas prints. Each piece is meticulously crafted
                to transform your space into a captivating gallery of art and sophistication. Our innovative printing
                process captures the essence of natural beauty, making every print a true work of art.
            </p></ExpandableParagraph>

            <ExpandableParagraph><p className={`${cardText} mt-4`}>
                Whether you're an experienced collector or a newcomer to fine art, our collection embodies exceptional
                quality, emotion, and innovation. Every canvas print is a testament to refined taste and unparalleled
                craftsmanship.
            </p></ExpandableParagraph>

            <ExpandableParagraph><p className={`${cardText} mt-3`}>
                Experience the perfect fusion of artistic mastery and modern technology. Let our prints ignite
                conversation, inspire creativity, and elevate your home or office with a touch of brilliance.
            </p></ExpandableParagraph>

            <hr className="border-t-2 mt-6 mb-4"/>
            <div className="grid grid-cols-2">
                <DescriptionText/>
                <DigitalCopiesSection/>
            </div>
        </div>
    }
;

export default CanvasPrintSection;
