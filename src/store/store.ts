import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import productBasketReducer from './productBasketSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        productBasket: productBasketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
