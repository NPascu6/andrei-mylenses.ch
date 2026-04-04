import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {RoutesSwitch} from './Routes';
import BottomBar from "./components/common/BottomBar";
import Loading from "./components/common/Loading";
import {
    applyThemePreferences,
    getThemePreset,
    loadThemePreferencesFromLocation,
    persistThemePreferences,
    type ThemePresetId,
} from './utils/themePreferences';

const TopBar = React.lazy(() => import('./components/common/TopBar'));
const QuickSidebar = React.lazy(() => import('./components/common/QuickSidebar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));
const ALLOWED_PREVIEW_ORIGINS = new Set([
    'https://pascu.io',
    'https://www.pascu.io',
    'http://localhost:3000',
    'http://localhost:5173',
]);

const getInitialThemePreset = (): ThemePresetId => {
    if (typeof window === 'undefined') {
        return 'noir';
    }

    return loadThemePreferencesFromLocation(window.location.search).themePreset;
};

function App() {
    const location = useLocation();
    const [themePreset, setThemePreset] = useState<ThemePresetId>(getInitialThemePreset);

    useEffect(() => {
        applyThemePreferences({themePreset});
    }, [themePreset]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            if (!ALLOWED_PREVIEW_ORIGINS.has(event.origin)) {
                return;
            }

            if (event.data?.type !== 'pascu-preview:capture' || typeof event.data?.requestId !== 'string') {
                return;
            }

            try {
                const {default: html2canvas} = await import('html2canvas');
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

    const handleThemePresetChange = (nextThemePreset: ThemePresetId) => {
        persistThemePreferences({themePreset: nextThemePreset});
        setThemePreset(nextThemePreset);
    };

    return (
        <div className={`app select-none min-h-screen transition-colors duration-300 ${activeThemePreset.mode === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <React.Suspense fallback={<Loading/>}>
                <TopBar themePreset={themePreset} onThemePresetChange={handleThemePresetChange}/>
            </React.Suspense>
            <React.Suspense fallback={null}>
                <QuickSidebar/>
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
