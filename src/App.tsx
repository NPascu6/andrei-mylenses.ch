import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';
import { RoutesSwitch } from './Routes';

//import topbar lazy
const TopBar = React.lazy(() => import('./components/common/TopBar'));
const Toaster = React.lazy(() => import('./components/common/Toaster'));

function App() {
  const dipatch = useDispatch()
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    dipatch(setTheme(isDarkTheme))
  }, [dipatch])

  useEffect(() => {
    dipatch(setTheme(true));
  }, [dipatch])

  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app select-none`}>
      <React.Suspense fallback={<div></div>}>
        <TopBar />
      </React.Suspense>
      <div className="content-container">
        <RoutesSwitch />
      </div>
      <React.Suspense fallback={<div></div>}>
        <Toaster />
      </React.Suspense>

    </div>
  );
}

export default App;
