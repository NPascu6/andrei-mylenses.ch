import React, { useRef, useState } from 'react';
import PhotoCard from './PhotoCard';
import CollapseIcon from './CollapseIcon';
import ExpandIcon from './ExpandIcon';

interface PhotoGalleryProps {
    images: any[]
    imageDescriptions: { title: string, description: string }[]
}

const PhotoGallery = ({ images, imageDescriptions }: PhotoGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
    const divRef = useRef<any>(null);

    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCardVisible(!isCardVisible);
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {images.map((image, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                        setIsCardVisible(false)
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
                <div
                    className={`fixed top-4 left-0 w-3/4 ${!isCardVisible ? 'h-1/4' : 'h-1/3'} flex items-start justify-center bg-black bg-opacity-90`}>
                    <div className="rounded-lg shadow-lg flex flex-col md:flex-row">
                        <img
                            onClick={(e) => handleExpand(e)}
                            ref={divRef}
                            src={selectedImage}
                            alt={selectedImage}
                            className="max-h-full max-w-full"
                        />
                        {isCardVisible ? <div className='relative'>
                            <div className='bg-black' onClick={(e) => handleExpand(e)}>
                                <CollapseIcon />
                            </div>
                            <div className='fixed w-3/4'>
                                <PhotoCard
                                    title={getTitle(selectedImage)}
                                    description={imageDescriptions.find(d => d.title === getTitle(selectedImage))?.description ?? ""}
                                    price={10}
                                    onAddToBasket={() => null} />
                            </div>
                        </div> :
                            <div className='bg-black'>
                                <div onClick={(e) => handleExpand(e)}><ExpandIcon /></div>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;