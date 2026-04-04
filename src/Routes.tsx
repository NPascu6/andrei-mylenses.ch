import React, {Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Loading from "./components/common/Loading";

const MainPage = lazy(() => import('./pages/MainPage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ArtworkPage = lazy(() => import('./pages/ArtworkPage'));
const PrintsPage = lazy(() => import('./pages/PrintsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

export const RoutesSwitch: React.FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/collection" element={<CollectionPage/>}/>
                <Route path="/artwork/:slug" element={<ArtworkPage/>}/>
                <Route path="/prints" element={<PrintsPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Suspense>
    );
};
