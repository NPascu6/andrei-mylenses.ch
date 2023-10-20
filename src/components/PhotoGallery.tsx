import React, { useState } from 'react';
import SelectedPhoto from './SelectedPhoto';

interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                        if (!selectedImage)
                            setSelectedImage(image.default)
                        else
                            setSelectedImage(null)
                    }}>
                    <img
                        src={image.default}
                        alt={image.default}
                        className="w-full h-auto rounded-md"
                    />
                </div>
            ))}

            {selectedImage && (
                <SelectedPhoto selectedImage={selectedImage} />
            )}
        </div>
    );
};

export default PhotoGallery;