import React, { useState } from 'react';

interface PhotoCardProps {
    title: string;
    description: string;
    price: number;
    onAddToBasket: () => void;
}

const PhotoCard = ({ title, description, price, onAddToBasket }: PhotoCardProps) => {

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="py-0 px-0 rounded overflow-hidden shadow-lg bg-gray-400">
            <div className="px-2 py-2">
                <div className="font-bold text-xl mb-1">{title}</div>
            </div>
            <div className='divide-y-1' />
            <div className="px-2 py-2">
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-2 py-2">
                <p className="text-gray-700 font-bold text-xl">${price}</p>
            </div>
            <div className="px-2 py-2">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 bg-white rounded-md border border-gray-400"
                />
            </div>
            <div className="px-4 py-2 flex justify-end">
                <button
                    onClick={onAddToBasket}
                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">
                    Add to Basket
                </button>
            </div>
        </div>
    );
};

export default PhotoCard;