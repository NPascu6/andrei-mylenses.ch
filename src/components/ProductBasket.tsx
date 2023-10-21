import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CloseIcon from './icons/CloseIcon';
import { setProducts } from '../store/productBasketSlice';
import CartFilled from './icons/CartFilled';

const getScreenHeightAsCssClass = () => {
    const height = window.innerHeight;
    if (height < 640) {
        return 'sm';
    } else if (height < 768) {
        return 'md';
    } else if (height < 1024) {
        return 'lg';
    } else {
        return 'xl';
    }
}

const ProductBasket = ({ setBasketClosed }: any) => {
    const products = useSelector((state: RootState) => state.productBasket.products);
    const dispatch = useDispatch()
    const [screenHeightAsCssClass, setScreenHeightAsCssClass] = React.useState(getScreenHeightAsCssClass());

    const getTotalPrice = () => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleRemove = (title: string) => {
        const newProducts = products.filter((product) => product.title !== title);
        localStorage.setItem('products', JSON.stringify(newProducts));
        dispatch(setProducts(newProducts));
    }

    useEffect(() => {
        const handleResize = () => {
            const height = window.innerHeight;
            if (height < 640) {
                setScreenHeightAsCssClass('sm');
            } else if (height < 768) {
                setScreenHeightAsCssClass('md');
            } else if (height < 1024) {
                setScreenHeightAsCssClass('lg');
            } else {
                setScreenHeightAsCssClass('xl');
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //useEffect to handle click away and close the product basket
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (event.target.id === 'product-basket') {
                setBasketClosed(true);
            }
        }

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setBasketClosed]);

    return (
        <div id={'product-basket'} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 h-full">
            <div className="bg-white rounded-lg shadow-md w-2/3">
                <div className='flex justify-between align-center'>
                    <div className="text-2xl font-semibold p-3 border-b w-full flex">
                        <div className='mr-2'>
                            <CartFilled color='green' width='34' height='34' />
                        </div>
                        Basket
                    </div>
                    <div className='p-2' onClick={() => setBasketClosed(true)}>
                        <CloseIcon />
                    </div>
                </div>
                <div className='block overflow-auto' style={{ height: screenHeightAsCssClass === 'sm' ? '8em' : '30em' }}>
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="p-4 border-b-2 last:border-b-0 flex flex-col md:flex-row justify-between items-center"
                        >
                            <div className="mb-4 md:mb-0 md:mr-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-30 h-24 md:w-12 md:h-12 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 md:ml-2 p-1">
                                <div className="text-md md:text-lg font-semibold">{product.title}</div>
                                <div className="text-gray-500">
                                    {product.size} - ${product.price} x {product.quantity}
                                </div>
                            </div>
                            <div className="flex justify-between items-center md:items-end">
                                <div className="text-lg font-semibold text-right md:border-t-2 mr-2">
                                    ${(product.price * product.quantity).toFixed(2)}
                                </div>
                                <div className="md:border">
                                    <button className="m-1.5" onClick={() => handleRemove(product.title)}>
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div style={{ height: '6em' }}>
                    <div className="p-2">
                        <div className="text-lg font-semibold text-right">Total: ${getTotalPrice().toFixed(2)}</div>
                    </div>
                    <div className="p-2">
                        <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBasket;