import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCanvasPhotos, setPhotos, setTheme} from './store/appSlice';
import {RootState} from './store/store';
import {RoutesSwitch} from './Routes';
import {canvaseImages, images} from "./config/images";
import BottomBar from "./components/common/BottomBar";
import Loading from "./components/common/Loading";

const TopBar = React.lazy(() => import('./components/common/TopBar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));

function App() {
    const dispatch = useDispatch()
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);


    useEffect(() => {
        Promise.all(images)
            .then((imgs) => {
                const images = imgs.map((img: any) => {
                    return {
                        src: img.default,
                        //extract the title from the image source
                        title: img.default.split('/').pop()?.split('.')[0],
                    }
                });

                dispatch(setPhotos(images));
            })
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Images loaded'));
    }, []);

    useEffect(() => {
        Promise.all(canvaseImages)
            .then((imgs) => {
                const images = imgs.map((img: any) => {
                    return {
                        src: img.default,
                        //extract the title from the image source
                        title: img.default.split('/').pop()?.split('.')[0],
                    }
                });
                dispatch(setCanvasPhotos(images));
            })
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Canvas Images loaded'));
    }, []);

    useEffect(() => {
        const savedPreference = localStorage.getItem('isDarkTheme') === 'true';
        const theme = savedPreference ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        dispatch(setTheme(savedPreference));
    }, [])

    return (
        <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app select-none`}>
            <React.Suspense fallback={<Loading/>}>
                <TopBar/>
            </React.Suspense>
            <div className="content-container">
                <RoutesSwitch/>
            </div>
            <React.Suspense fallback={<Loading/>}>
                <Toaster/>
            </React.Suspense>
            <React.Suspense fallback={<Loading/>}>
                <BottomBar/>
            </React.Suspense>
        </div>
    );
}

export default App;
