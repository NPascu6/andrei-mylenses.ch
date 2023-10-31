import React, { useState } from 'react';
import SelectedPhoto from '../SelectedPhoto';
import InitialImage from '../../assets/photos/Stelvio pass v2.jpg';

interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [previouseSelectedImage, setPreviousSelectedImage] = useState<any | null>(InitialImage);
    const [nextSelectedImage, setNextSelectedImage] = useState<any | null>(null);
    const [index, setIndex] = useState(0);

    return (
        <div className='card m-2 mt-1 rounded-lg shadow-xl p-0.5'>
            <div className="rounded shadow-lg m-0 grid grid-cols-2 md:grid-cols-4 gap-1">

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
        </div>

    );
};

export default PhotoGallery;