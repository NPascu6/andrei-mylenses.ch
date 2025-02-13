import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Loading from "./components/common/Loading";

export const RoutesSwitch: React.FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
        </Suspense>
    );
};
