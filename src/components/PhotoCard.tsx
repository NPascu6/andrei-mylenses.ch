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
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300 m-10 h-1/4">
            <div className="px-6 py-2">
                <div className="font-bold text-xl mb-1">{title}</div>
            </div>
            <div className="px-6 py-2">
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 py-2">
                <p className="text-gray-700 font-bold text-xl">${price}</p>
            </div>
            <div className="px-6 py-2">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 p-2 bg-white rounded-md border border-gray-400"
                />
            </div>
            <div className="px-6 py-4 flex justify-end">
                <button
                    onClick={onAddToBasket}
                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Basket
                </button>
            </div>
        </div>
    );
};

export default PhotoCard;