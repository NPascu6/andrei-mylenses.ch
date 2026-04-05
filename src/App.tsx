import React from 'react';
import {useLocation} from 'react-router-dom';
import {RoutesSwitch} from './Routes';
import BottomBar from "./components/common/BottomBar";
import Loading from "./components/common/Loading";
import PwaPrompt from './components/common/PwaPrompt';
import {usePreviewCapture} from './hooks/usePreviewCapture';
import {useRouteScrollReset} from './hooks/useRouteScrollReset';
import {useThemePreset} from './hooks/useThemePreset';

const TopBar = React.lazy(() => import('./components/common/TopBar'));
const QuickSidebar = React.lazy(() => import('./components/common/QuickSidebar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));
function App() {
    const location = useLocation();
    const {themePreset, activeThemePreset, setThemePreset} = useThemePreset();
    useRouteScrollReset(location.pathname);
    usePreviewCapture();

    return (
        <div className={`app select-none min-h-screen transition-colors duration-300 ${activeThemePreset.mode === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <React.Suspense fallback={<Loading/>}>
                <TopBar themePreset={themePreset} onThemePresetChange={setThemePreset}/>
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
            <PwaPrompt/>
        </div>
    );
}

export default App;
