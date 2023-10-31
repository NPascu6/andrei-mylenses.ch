import React from 'react';
import artistImage from '../assets/portrait.jpg';
import { useSelector } from 'react-redux';
import ImageSlider from '../components/common/ImageSlider';
import { RootState } from '../store/store';

const ProductDescription = React.lazy(() => import('../components/main-page/ProductDescription'));
const PhotographerDescriptionCard = React.lazy(() => import('../components/main-page/PhotographerDescriptionCard'));

const MainPage = () => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const imageSources = photos?.map((photo: any) => photo.default);
    
    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <React.Suspense fallback={<div></div>}>
                    <PhotographerDescriptionCard artistImage={artistImage} />
                </React.Suspense>
            </div>
            <div className="hidden md:block">
                {photos?.length > 0 && <div className="flex justify-center items-center h-full m-2 mt-0">
                    <ImageSlider images={imageSources} />
                </div>}
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