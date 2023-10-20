import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CloseIcon from './CloseIcon';
import { setProducts } from '../store/productBasketSlice';

const ProductBasket = ({ setBasketClosed }: any) => {
    const products = useSelector((state: RootState) => state.productBasket.products);
    const dispatch = useDispatch()

    const getTotalPrice = () => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleRemove = (title: string) => {
        const newProducts = products.filter((product) => product.title !== title);
        localStorage.setItem('products', JSON.stringify(newProducts));
        dispatch(setProducts(newProducts));
    }

    return (
        <div id={'product-basket'} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 h-full">
            <div className="bg-white rounded-lg shadow-md w-2/3">
                <div className='flex justify-between align-center'>
                    <div className="text-2xl font-semibold p-3 border-b w-full">
                        Basket
                    </div>
                    <div className='p-2' onClick={() => setBasketClosed(true)}>
                        <CloseIcon />
                    </div>
                </div>
                <div className='block overflow-auto' style={{ height: '30em' }}>
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="p-4 border-b last:border-b-0 flex justify-between items-center"
                        >
                            <div>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 ml-4">
                                <div className="text-lg font-semibold">{product.title}</div>
                                <div className="text-gray-500">
                                    {product.size} - ${product.price} x {product.quantity}
                                </div>
                            </div>
                            <div className="text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</div>
                            <div className='border m-2'>
                                <button className="m-2" onClick={() => handleRemove(product.title)}>
                                    <CloseIcon />
                                </button>
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