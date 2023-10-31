import React from 'react';
import Favicon32 from '../../assets/favicon-32x32.png';
import ToggleSvgDark from '../../assets/icons/ToggleSvgDark';
import ToggleSvgLight from '../../assets/icons/ToggleSvgLight';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setTheme } from '../../store/appSlice';

const TopBar = () => {
    const dipatch = useDispatch()
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

    const changeTheme = () => {
        const theme = isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        dipatch(setTheme(!isDarkTheme))
        localStorage.setItem('isDarkTheme', !isDarkTheme ? 'true' : 'false');
    }

    return <div id='top-bar' className='flex flex-row md:flex-row md:items-center p-2 shadow-xl'>
        <div className='flex flex-grow justify-start items-center pl-4'>
            <img className='w-8 h-8 md:w-10 md:h-10 mr-2' src={Favicon32} alt="favicon" />
            <div className='text-2xl md:text-3xl font-semibold'>My Lenses<div className='text-xs md:text-md ml-1'>by Andrei Pascu</div></div>
        </div>
        <div className='flex justify-end items-center ' onClick={changeTheme}>
            {!isDarkTheme ? <ToggleSvgDark /> : <ToggleSvgLight />}
        </div>
    </div>
}

export default TopBar