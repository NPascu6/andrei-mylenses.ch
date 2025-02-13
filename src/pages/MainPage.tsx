import React from 'react';
import artistImage from '../assets/portrait.jpg';
import {useSelector} from 'react-redux';
import ImageSlider from '../components/common/ImageSlider';
import {RootState} from '../store/store';
import Loading from "../components/common/Loading";

const ProductDescription = React.lazy(() => import('../components/product-description/ProductDescription'));
const PhotographerDescriptionCard = React.lazy(() => import('../components/main-page/PhotographerDescriptionCard'));

const MainPage = () => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const imageSources = photos?.map((photo: any) => photo.default);

    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <React.Suspense fallback={<Loading/>}>
                    <PhotographerDescriptionCard artistImage={artistImage}/>
                </React.Suspense>
            </div>
            <div className="hidden">
                {photos?.length > 0 && <div className="flex justify-center items-center h-full m-2 mt-0">
                    <ImageSlider images={imageSources}/>
                </div>}
            </div>
            <div className='flex flex-col md:flex-row'>
                <React.Suspense fallback={<Loading/>}>
                    <ProductDescription/>
                </React.Suspense>
            </div>
        </div>
    );
}

export default MainPage;