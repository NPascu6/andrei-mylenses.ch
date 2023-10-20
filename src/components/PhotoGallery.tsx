import React, { useState } from 'react';
import SelectedPhoto from './SelectedPhoto';

interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [previouseSelectedImage, setPreviousSelectedImage] = useState<any | null>(null);
    const [nextSelectedImage, setNextSelectedImage] = useState<any | null>(null);
    const [index, setIndex] = useState(0);

    return (
        <div className="p-4 border rounded-md shadow-lg m-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                        if (!selectedImage) {
                            setIndex(index);
                            setPreviousSelectedImage(images[index - 1]);
                            setNextSelectedImage(images[index + 1]);
                            setSelectedImage(image.default)
                        }
                        else {
                            setSelectedImage(null)
                        }

                    }}>
                    <img
                        src={image.default}
                        alt={image.default}
                        className="w-full h-auto rounded-md"
                    />
                </div>
            ))}

            {selectedImage && (
                <SelectedPhoto
                    index={index}
                    setIndex={setIndex}
                    images={images}
                    selectedImage={selectedImage}
                    setPreviousSelectedImage={setPreviousSelectedImage}
                    setNextSelectedImage={setNextSelectedImage}
                    setSelectedImage={setSelectedImage}
                    previouseSelectedImage={previouseSelectedImage}
                    nextSelectedImage={nextSelectedImage} />
            )}
        </div>
    );
};

export default PhotoGallery;