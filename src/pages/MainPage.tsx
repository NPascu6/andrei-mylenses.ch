


import React, { useEffect, useState } from 'react';
import PhotoGallery from '../components/main-page/PhotoGallery';
import artistImage from '../assets/portrait.jpg';
import Instagram from '../components/icons/Instagram';
import WhatsApp from '../components/icons/WhatsApp';
import Email from '../components/icons/Email';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { imageDescriptions, images } from '../config/images';
import PhotographerDescriptionCard from '../components/main-page/PhotographerDescriptionCard';
import BusinessDescriptionCard from '../components/main-page/BusinessDescriptionCard';

const MainPage = () => {
    const [loadedImages, setLoadedImages] = useState<any>([]);
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme)

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
                <BusinessDescriptionCard />
            </div>
            <PhotoGallery images={loadedImages} imageDescriptions={imageDescriptions} />
            {/* Footer Section for Contact and Social Links */}
            <div className="p-4 text-center border mb-6 ml-4 mr-4 rounded" style={{ height: '6em' }}>
                <div className="flex justify-evenly space-x-4">
                    <a href="https://www.instagram.com/andrei_mylenses/" target="_blank" rel="noopener noreferrer">
                        <Instagram color={isDarkTheme ? 'black' : 'white'} width='34' height='34' />
                    </a>
                    <a href="tel:+41795718784" target="_blank" rel="noopener noreferrer">
                        <WhatsApp color={isDarkTheme ? 'black' : 'white'} width='34' height='34' />
                    </a>
                    <a href="mailto:andrei.pascu86@yahoo.com">
                        <Email color={isDarkTheme ? 'black' : 'white'} width='34' height='34' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MainPage;