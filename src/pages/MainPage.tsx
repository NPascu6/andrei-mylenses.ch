import React from 'react';
import artistImage from '../assets/portrait.jpg';
import Loading from "../components/common/Loading";

const ProductDescription = React.lazy(() => import('../components/product-description/ProductDescription'));
const PhotographerDescriptionCard = React.lazy(() => import('../components/main-page/PhotographerDescriptionCard'));
const QuickSidebar = React.lazy(() => import('../components/common/QuickSidebar'));

const MainPage = () => {
    return (
        <main className="pb-28 xl:pb-0">
            <React.Suspense fallback={null}>
                <QuickSidebar/>
            </React.Suspense>
            <div className='flex flex-col'>
                <React.Suspense fallback={<Loading/>}>
                    <PhotographerDescriptionCard artistImage={artistImage}/>
                </React.Suspense>
            </div>
            <div className='flex flex-col'>
                <React.Suspense fallback={<Loading/>}>
                    <ProductDescription/>
                </React.Suspense>
            </div>
        </main>
    );
}

export default MainPage;
