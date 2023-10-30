import React, { useEffect, useState } from 'react';
import PhotoGallery from '../components/main-page/PhotoGallery';
import artistImage from '../assets/portrait.jpg';

import { imageDescriptions, images } from '../config/images';
import PhotographerDescriptionCard from '../components/main-page/PhotographerDescriptionCard';
import Contact from '../components/common/Contact';
import ProductDescription from '../components/ProductDescription';

const MainPage = () => {
    const [loadedImages, setLoadedImages] = useState<any>([]);

    useEffect(() => {
        if (loadedImages.length > 0) return;

        Promise.all(images)
            .then((loadedImages) => setLoadedImages(loadedImages))
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Images loaded'));
    }, [loadedImages]);

    return (
        <div>
            {loadedImages.length === 0 && <div>Loading...</div>}
            <div className='flex flex-col md:flex-row'>
                <PhotographerDescriptionCard artistImage={artistImage} />
                <ProductDescription />
            </div>
            <PhotoGallery images={loadedImages} imageDescriptions={imageDescriptions} />
            <Contact />
        </div>
    );
}

export default MainPage;