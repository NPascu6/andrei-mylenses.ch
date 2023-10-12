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
      <div className='flex m-3 border-b-2'>
        <div style={{ minWidth: '21.2em' }} className='flex justify-center w-full'>
          <div>
            <img className='p-1' src={Favicon32} alt="favicon" />
          </div>
          <div className="text-3xl p-1">My Lenses</div>
          <div className='text-md p-5'>by Andrei Pascu</div>
        </div>
        <div className='flex justify-end w-full p-1'>
          <button onClick={changeTheme}>
            {!isDarkTheme ? <ToggleSvgDark /> : <ToggleSvgLight />}
          </button>
        </div>
      </div>
      <div className='flex justify-center mt-2 p-2'>
        <RoutesSwitch />
      </div>
    </div>
  );
}

export default App;
