import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './store/appSlice';
import { RootState } from './store/store';
import { RoutesSwitch } from './Routes';
import Toaster from './components/common/Toaster';
import TopBar from './components/common/TopBar';

function App() {
  const dipatch = useDispatch()
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
  const products = useSelector((state: RootState) => state.productBasket.products);
  const [isBasketClosed, setBasketClosed] = useState(true);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    dipatch(setTheme(isDarkTheme))
  }, [dipatch])

  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}-theme app select-none`}>
      <TopBar products={products} isBasketClosed={isBasketClosed} setBasketClosed={setBasketClosed} />
      <div style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        <RoutesSwitch />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
