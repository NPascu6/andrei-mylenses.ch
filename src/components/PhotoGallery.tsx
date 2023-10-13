import React, { useState } from 'react';
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

    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsCardVisible(!isCardVisible);
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
                    onClick={() => {
                        setSelectedImage(null)
                        setIsCardVisible(false)
                    }}
                >
                    <div className="rounded-lg shadow-lg p-4 flex flex-col md:flex-row">
                        <img
                            src={selectedImage}
                            alt={selectedImage}
                            className="max-h-full max-w-full"
                        />
                        {isCardVisible ? <div className='fixed top-0 right-0 '>
                            <div className='fixed top-10 right-4 bg-black'>
                                <div onClick={(e) => handleExpand(e)}><CollapseIcon /></div>
                            </div>
                            <PhotoCard title={getTitle(selectedImage)} description={imageDescriptions.find(d => d.title === getTitle(selectedImage))?.description ?? ""} price={10} onAddToBasket={() => null} />
                        </div> :
                            <div className='fixed top-10 right-4 border-2 border-gray-200 bg-black'>
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