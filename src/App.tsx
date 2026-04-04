import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import html2canvas from 'html2canvas';
import {setCanvasPhotos, setPhotos, setThemePreset} from './store/appSlice';
import {RootState} from './store/store';
import {RoutesSwitch} from './Routes';
import {canvaseImages, images} from "./config/images";
import {importedInstagramPhotos} from "./config/instagram.generated";
import {cmsPhotoEntriesByBaseName} from "./content/cmsPhotos";
import BottomBar from "./components/common/BottomBar";
import Loading from "./components/common/Loading";
import {applyThemePreferences, getThemePreset, loadThemePreferencesFromLocation} from './utils/themePreferences';

const TopBar = React.lazy(() => import('./components/common/TopBar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));
const ALLOWED_PREVIEW_ORIGINS = new Set([
    'https://pascu.io',
    'https://www.pascu.io',
    'http://localhost:3000',
    'http://localhost:5173',
]);

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
                    const cmsMetadata = cmsPhotoEntriesByBaseName.get(title);
                    const instagramMetadata = instagramMetadataByFile.get(`${title}.jpg`) || instagramMetadataByFile.get(`${title}.jpeg`) || instagramMetadataByFile.get(`${title}.png`) || instagramMetadataByFile.get(`${title}.webp`);
                    const metadata = cmsMetadata || instagramMetadata;

                    return {
                        src: image.src,
                        fullSrc: image.fullSrc,
                        title: cmsMetadata?.title || instagramMetadata?.title || formatFallbackTitle(title),
                        slug: instagramMetadata?.shortcode || title,
                        description: metadata?.description || '',
                        location: metadata?.location || '',
                        category: metadata?.category || 'Travel',
                        featured: Boolean(cmsMetadata?.featured),
                        printReady: Boolean(cmsMetadata?.printReady),
                        permalink: cmsMetadata?.permalink || instagramMetadata?.permalink || '',
                        takenAt: cmsMetadata?.takenAt || instagramMetadata?.takenAt || '',
                    }
                }).sort((a, b) => a.title.localeCompare(b.title));

        dispatch(setPhotos(loaded));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCanvasPhotos(canvaseImages));
    }, [dispatch]);

    useEffect(() => {
        const savedPreferences = loadThemePreferencesFromLocation(window.location.search);
        applyThemePreferences(savedPreferences);
        
        dispatch(setThemePreset(savedPreferences.themePreset));
    }, [dispatch])

    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            if (!ALLOWED_PREVIEW_ORIGINS.has(event.origin)) {
                return;
            }

            if (event.data?.type !== 'pascu-preview:capture' || typeof event.data?.requestId !== 'string') {
                return;
            }

            try {
                const canvas = await html2canvas(document.body, {
                    backgroundColor: null,
                    useCORS: true,
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                    scrollX: window.scrollX,
                    scrollY: window.scrollY,
                });

                event.source?.postMessage(
                    {
                        type: 'pascu-preview:screenshot',
                        requestId: event.data.requestId,
                        dataUrl: canvas.toDataURL('image/png'),
                    },
                    {targetOrigin: event.origin},
                );
            } catch (error) {
                event.source?.postMessage(
                    {
                        type: 'pascu-preview:screenshot-error',
                        requestId: event.data.requestId,
                    },
                    {targetOrigin: event.origin},
                );
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

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
