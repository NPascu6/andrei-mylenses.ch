import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { showToaster } from '../../store/productBasketSlice';

const Toaster = () => {
    const showToasterStore = useSelector((state: RootState) => state.productBasket.showToaster);
    const toasterMessage = useSelector((state: RootState) => state.productBasket.toasterMessage);
    const dispatch = useDispatch()

    useEffect(() => {
        // Auto-hide the toaster after a few seconds
        const hideTimeout = setTimeout(() => {
            dispatch(showToaster(false));
        }, 1200);

        return () => clearTimeout(hideTimeout);
    }, [showToasterStore, dispatch]);

    return (
        <div
            className={`fixed bottom-10 right-0 mb-4 mr-4 ${showToasterStore ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
                } transition-opacity duration-100 ease-in-out transform transition-transform duration-200 hover:scale-105`}
        >
            <div className="bg-green-500 text-white rounded-md p-3 shadow-md">
                {toasterMessage}
            </div>
        </div>
    );
};

export default Toaster;
