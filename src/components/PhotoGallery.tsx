import React, { useState } from 'react';
import PhotoCard from './PhotoCard';


interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}


const PhotoGallery = ({ images, imageDescriptions }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setSelectedImage(image.default)}
                >
                    <img
                        src={image.default}
                        alt={image.default}
                        className="w-full h-auto rounded-md"
                    />
                </div>
            ))}
            {selectedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="rounded-lg shadow-lg p-4 flex flex-col md:flex-row">
                        <img
                            src={selectedImage}
                            alt={selectedImage}
                            className="max-h-full max-w-full"
                        />
                        <PhotoCard title={getTitle(selectedImage)} description={imageDescriptions.find(d => d.title === getTitle(selectedImage))?.description ?? ""} price={10} onAddToBasket={() => null} /></div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;