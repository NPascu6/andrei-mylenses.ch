import React from 'react';
import artistImage from '../assets/portrait.jpg';

const ProductDescription = React.lazy(() => import('../components/main-page/ProductDescription'));
const PhotographerDescriptionCard = React.lazy(() => import('../components/main-page/PhotographerDescriptionCard'));

const MainPage = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <React.Suspense fallback={<div></div>}>
                    <PhotographerDescriptionCard artistImage={artistImage} />
                </React.Suspense>
            </div>
            <div className='flex flex-col md:flex-row'>
                <React.Suspense fallback={<div></div>}>
                    <ProductDescription />
                </React.Suspense>
            </div>
        </div>
    );
}

export default MainPage;