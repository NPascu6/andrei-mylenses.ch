import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';
import { RoutesSwitch } from './Routes';
import Toaster from './components/common/Toaster';
import TopBar from './components/common/TopBar';

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
      <TopBar />
      <div className="content-container">
        <RoutesSwitch />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
