import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CanvasPrintSection from "./CanvasPrintSection";

const ProductDescription: React.FC = () => {
    const loadedCanvasImages = useSelector(
        (state: RootState) => state.app.canvasPhotos
    );

    return (
        <div className="m-1 mt-0">
            <CanvasPrintSection loadedCanvasImages={loadedCanvasImages}/>
        </div>
    );
};

export default ProductDescription;
