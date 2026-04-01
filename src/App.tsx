import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCanvasPhotos, setPhotos, setThemePreset} from './store/appSlice';
import {RootState} from './store/store';
import {RoutesSwitch} from './Routes';
import {canvaseImages, getPhotoMetadata, images} from "./config/images";
import {importedInstagramPhotos} from "./config/instagram.generated";
import BottomBar from "./components/common/BottomBar";
import Loading from "./components/common/Loading";
import {applyThemePreferences, getThemePreset, loadThemePreferences} from './utils/themePreferences';

const TopBar = React.lazy(() => import('./components/common/TopBar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));

function App() {
    const dispatch = useDispatch()
    const themePreset = useSelector((state: RootState) => state.app.themePreset);
    const instagramMetadataByFile = new Map(
        importedInstagramPhotos.map((photo) => [photo.fileName, photo])
    );

    const formatFallbackTitle = (rawTitle: string) =>
        decodeURIComponent(rawTitle)
            .replace(/\b(v\d+)\b/gi, '')
            .replace(/[-_]+/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase());

    useEffect(() => {
        Promise.all(images.map((load) => load()))
            .then((imgs) => {
                const loaded = imgs.map((img: any) => {
                    const title = img.default.split('/').pop()?.split('.')[0] || '';
                    const portfolioMetadata = getPhotoMetadata(title);
                    const instagramMetadata = instagramMetadataByFile.get(`${title}.jpg`) || instagramMetadataByFile.get(`${title}.jpeg`) || instagramMetadataByFile.get(`${title}.png`) || instagramMetadataByFile.get(`${title}.webp`);
                    const metadata = portfolioMetadata || instagramMetadata;

                    return {
                        src: img.default,
                        title: portfolioMetadata?.displayTitle || instagramMetadata?.title || formatFallbackTitle(title),
                        slug: instagramMetadata?.shortcode || title,
                        description: metadata?.description || '',
                        location: metadata?.location || '',
                        category: metadata?.category || 'Travel',
                        featured: Boolean(portfolioMetadata?.featured),
                        permalink: instagramMetadata?.permalink || '',
                        takenAt: instagramMetadata?.takenAt || '',
                    }
                }).sort((a, b) => a.title.localeCompare(b.title));

                dispatch(setPhotos(loaded));
            })
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Images loaded'));
    }, [dispatch]);

    useEffect(() => {
        Promise.all(canvaseImages.map((load) => load()))
            .then((imgs) => {
                const imagesLoaded = imgs.map((img: any) => {
                    return {
                        src: img.default,
                        title: img.default.split('/').pop()?.split('.')[0],
                    }
                });
                dispatch(setCanvasPhotos(imagesLoaded));
            })
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Canvas Images loaded'));
    }, []);

    useEffect(() => {
        const savedPreferences = loadThemePreferences();
        applyThemePreferences(savedPreferences);
        
        dispatch(setThemePreset(savedPreferences.themePreset));
    }, [dispatch])

    const activeThemePreset = getThemePreset(themePreset);

    return (
        <div className={`app select-none min-h-screen transition-colors duration-300 ${activeThemePreset.mode === 'dark' ? 'theme-dark' : 'theme-light'}`}>
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
