import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSvgDark from './ToggleSvgDark';
import ToggleSvgLight from './ToggleSvgLight';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';
import { RoutesSwitch } from './Routes';
import Favicon32 from './assets/favicon-32x32.png';
import CartIcon from './components/icons/CartIcon';
import ProductBasket from './components/ProductBasket';
import Toaster from './components/common/Toaster';

function App() {
  const dipatch = useDispatch()
  const cartRef = useRef<any>(null);
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
  const products = useSelector((state: RootState) => state.productBasket.products);
  const [isBasketClosed, setBasketClosed] = useState(true);

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

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        debugger
        setBasketClosed(true);
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef]);

  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app select-none`}>
      <div className='flex flex-row md:flex-row md:items-center p-2 border-b-2 '>
        <div className='flex flex-grow justify-start items-center pl-4'>
          <img className='w-8 h-8 md:w-10 md:h-10 mr-2' src={Favicon32} alt="favicon" />
          <div className='text-2xl md:text-3xl font-semibold'>My Lenses<div className='text-xs md:text-md ml-1'>by Andrei Pascu</div></div>
        </div>
        <div className='flex justify-end items-center'>
          {products?.length > 0 && <div className='mr-2 cursor-pointer' onClick={() => setBasketClosed(false)}>
            <CartIcon itemCount={products?.length} />
          </div>}
          <button onClick={changeTheme}>
            {!isDarkTheme ? <ToggleSvgDark /> : <ToggleSvgLight />}
          </button>
          {!isBasketClosed && <div ref={cartRef}><ProductBasket setBasketClosed={setBasketClosed} /></div>}
        </div>
      </div>
      <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <RoutesSwitch />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
