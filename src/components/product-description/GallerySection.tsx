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
        <CollapsibleSection>
            <PhotoGallery images={loadedImages} imageDescriptions={imageDescriptions}/>
        </CollapsibleSection>

    );
};

export default GallerySection;
