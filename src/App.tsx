import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSvgDark from './ToggleSvgDark';
import ToggleSvgLight from './ToggleSvgLight';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';
import { RoutesSwitch } from './Routes';
import Favicon32 from './assets/favicon-32x32.png';

function App() {
  const dipatch = useDispatch()
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  const changeTheme = () => {
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    dipatch(setTheme(!isDarkTheme))
    localStorage.setItem('isDarkTheme', !isDarkTheme ? 'true' : 'false');
  }

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    dipatch(setTheme(isDarkTheme))
  }, [dipatch])


  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app`}>
      <div className='flex flex-row md:flex-row md:items-center p-3 border-b-2'>
        <div className='flex flex-grow justify-center items-center'>
          <img className='w-8 h-8 md:w-10 md:h-10 mr-1' src={Favicon32} alt="favicon" />
          <div className='text-2xl md:text-3xl font-semibold'>My Lenses<div className='text-xs md:text-md ml-1'>by Andrei Pascu</div></div>
        </div>
        <div className='flex justify-end items-center'>
          <button onClick={changeTheme}>
            {!isDarkTheme ? <ToggleSvgDark /> : <ToggleSvgLight />}
          </button>
        </div>
      </div>
      <div className='flex justify-center p-2'>
        <RoutesSwitch />
      </div>
    </div>
  );
}

export default App;
