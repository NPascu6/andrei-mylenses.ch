import React, {useEffect, useState} from 'react';
import SelectedPhoto from './SelectedPhoto';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}

const PhotoGallery = ({images, imageDescriptions}: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [selectedImageDescription, setSelectedImageDescription] = useState<any | null>(null);
    const [selectedImageTitle, setSelectedImageTitle] = useState<any | null>(null);
    const [previouseSelectedImage, setPreviousSelectedImage] = useState<any | null>(null);
    const [nextSelectedImage, setNextSelectedImage] = useState<any | null>(null);
    const [index, setIndex] = useState(0);
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);


    useEffect(() => {
        if (!selectedImage) return;
        const title = selectedImage.split('/').pop()?.split('.')[0];
        const image = imageDescriptions.find((imageDescription) => imageDescription.title === title);
        const imageTitle = image?.title;
        const imageDescription = image?.description;

        setSelectedImageTitle(imageTitle);
        setSelectedImageDescription(imageDescription);
    }, [imageDescriptions, selectedImage])

    return (
        <div className='card m-2 mt-1 rounded-lg shadow-xl p-0.5'>
            <div className="rounded shadow-lg m-0 grid grid-cols-2 md:grid-cols-4 gap-1">

                {images.map((image, index) => (
                    <div
                        key={index}
                        className="cursor-pointer flex"
                        onClick={() => {
                            if (!selectedImage) {
                                setIndex(index);
                                setPreviousSelectedImage(images[index - 1]);
                                setNextSelectedImage(images[index + 1]);
                                setSelectedImage(image.src)
                            } else {
                                setSelectedImage(null)
                            }

                        }}>
                        <img
                            loading="lazy"
                            src={image.src}
                            alt={image.src}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                ))}

                {selectedImage && (
                    <SelectedPhoto
                        index={index}
                        images={images}
                        setIndex={setIndex}
                        selectedImageDescription={selectedImageDescription}
                        selectedImageTitle={selectedImageTitle}
                        selectedImage={selectedImage}
                        setPreviousSelectedImage={setPreviousSelectedImage}
                        setNextSelectedImage={setNextSelectedImage}
                        setSelectedImage={setSelectedImage}
                        previouseSelectedImage={previouseSelectedImage}
                        nextSelectedImage={nextSelectedImage}/>
                )}
            </div>
        </div>

    );
};

export default React.memo(PhotoGallery);
