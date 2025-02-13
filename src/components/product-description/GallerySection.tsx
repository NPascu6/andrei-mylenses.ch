import React from "react";
import {useSelector} from "react-redux";
import CollapsibleSection from "../../components/common/CollapsableSection";
import {imageDescriptions} from "../../config/images";
import {RootState} from "../../store/store";
import PhotoGallery from "../main-page/PhotoGallery";

const GallerySection: React.FC = () => {
    const loadedImages = useSelector((state: RootState) => state.app.photos);

    if (!imageDescriptions?.length) return null;

    return (
        <div className={"border-t-2"}>
            <CollapsibleSection title="Check out some more of my art">
                <PhotoGallery images={loadedImages} imageDescriptions={imageDescriptions}/>
            </CollapsibleSection>
        </div>

    );
};

export default GallerySection;
