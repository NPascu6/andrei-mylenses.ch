import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSvgDark from './ToggleSvgDark';
import ToggleSvgLight from './ToggleSvgLight';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';

function App() {
  const dipatch = useDispatch()
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  const changeTheme = () => {
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    dipatch(setTheme(!isDarkTheme))
    localStorage.setItem('isDarkTheme', isDarkTheme ? 'true' : 'false');
  }

  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app`}>
      <div className='flex m-3 border-b-2'>
        <div style={{ minWidth: '20em' }} className='flex justify-center w-full'>
          <div className="text-3xl p-1">My Lenses</div>
          <div className='text-md p-5'>by Andrei Pascu</div>
        </div>
        <div className='flex justify-end w-full p-2'>
          <button onClick={changeTheme}>
            {!isDarkTheme ? <ToggleSvgDark /> : <ToggleSvgLight />}
          </button>
        </div>
      </div>
      <div className='flex justify-center mt-5'>
        <div className='text-3xl'>Coming soon...</div>
      </div>
    </div>
  );
}

export default App;
