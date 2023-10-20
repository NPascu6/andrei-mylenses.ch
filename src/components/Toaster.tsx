import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { showToaster } from '../store/productBasketSlice';

const Toaster = () => {
    const showToasterStore = useSelector((state: RootState) => state.productBasket.showToaster);
    const toasterMessage = useSelector((state: RootState) => state.productBasket.toasterMessage);
    const dispatch = useDispatch()

    useEffect(() => {
        // Auto-hide the toaster after a few seconds
        const hideTimeout = setTimeout(() => {
            dispatch(showToaster(false));
        }, 2000);

        return () => clearTimeout(hideTimeout);
    }, [showToasterStore, dispatch]);

    return (
        <div className={`fixed bottom-10 right-0 mb-4 mr-4 ${showToasterStore ? 'visible' : 'invisible'}`}>
            <div className="bg-green-500 text-white rounded-md p-3 shadow-md transform transition-transform duration-300 hover:scale-105">
                {toasterMessage}
            </div>
        </div>
    );
};

export default Toaster;
