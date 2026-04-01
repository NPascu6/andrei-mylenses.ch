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
        const loaded = images.map((image) => {
                    const title = image.baseName;
                    const portfolioMetadata = getPhotoMetadata(title);
                    const instagramMetadata = instagramMetadataByFile.get(`${title}.jpg`) || instagramMetadataByFile.get(`${title}.jpeg`) || instagramMetadataByFile.get(`${title}.png`) || instagramMetadataByFile.get(`${title}.webp`);
                    const metadata = portfolioMetadata || instagramMetadata;

                    return {
                        src: image.src,
                        fullSrc: image.fullSrc,
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
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCanvasPhotos(canvaseImages));
    }, [dispatch]);

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
