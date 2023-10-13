import React, { useState } from 'react';


interface PhotoGalleryProps {
    images: any[]
}


const PhotoGallery = ({ images }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    debugger
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
                    <img
                        src={selectedImage.default}
                        alt={selectedImage.default}
                        className="max-h-full max-w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;