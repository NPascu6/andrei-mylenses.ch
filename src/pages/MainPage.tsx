import React from 'react';
import artistImage from '../assets/portrait.jpg';
import PhotographerDescriptionCard from '../components/main-page/PhotographerDescriptionCard';
import FirstImage from '../assets/photos/Stelvio pass v2.jpg'
import SecondImage from '../assets/photos/Angels of Oradea.jpg'
import ProductDescription from '../components/main-page/ProductDescription';

const MainPage = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <PhotographerDescriptionCard artistImage={artistImage} firstPhoto={FirstImage} secondPhoto={SecondImage} />
            </div>
            <div className='flex flex-col md:flex-row'>
                <ProductDescription />
            </div>
        </div>
    );
}

export default MainPage;