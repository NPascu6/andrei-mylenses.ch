import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import PhotoGallery from "../main-page/PhotoGallery";

const GallerySection: React.FC = () => {
    const loadedImages = useSelector((state: RootState) => state.app.photos);

    if (!loadedImages?.length) return null;

    return (
        <PhotoGallery images={loadedImages}/>
    );
};

export default GallerySection;
