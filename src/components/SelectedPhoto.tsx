import { useDispatch } from "react-redux";
import { addProduct, setToasterMessage, showToaster } from "../store/productBasketSlice";
import CloseIcon from "./CloseIcon";
import { useState } from "react";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";

const SelectedPhoto = ({ selectedImage, setSelectedImage, previouseSelectedImage, nextSelectedImage, images, index, setPreviousSelectedImage, setNextSelectedImage, setIndex }: any) => {
    const [selectedSize, setSelectedSize] = useState('16x20');
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleSizeChange = (e: any) => {
        setSelectedSize(e.target.value);
    }

    const handleQuantityChange = (e: any) => {
        setSelectedQuantity(e.target.value);
    }

    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }

    const PhotoCanvasDetails = () => {
        const dispatch = useDispatch();

        const sendToBasket = () => {
            const product = {
                title: getTitle(selectedImage),
                price: 99.99,
                quantity: selectedQuantity,
                size: selectedSize,
                image: selectedImage
            }

            dispatch(addProduct(product));
            dispatch(showToaster(true));
            dispatch(setToasterMessage('Added to basket!'));
        }

        return (
            <div id='photo-canvas-details' className="rounded-md shadow-lg p-2" style={{ minWidth: '7em' }}>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Price</label>
                    <div className="text-lg font-semibold">$99.99</div>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Quantity</label>
                    <input
                        onChange={handleQuantityChange}
                        type="number"
                        className="w-full py-2 px-2 border rounded-md"
                        value={selectedQuantity}
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-medium">Size</label>
                    <select
                        onChange={handleSizeChange}
                        className="py-2 px-2 border rounded-md w-full"
                        value={selectedSize}
                    >
                        <option value="8x10">8x10</option>
                        <option value="16x20">16x20</option>
                        <option value="24x36">24x36</option>
                    </select>
                </div>
                <div className="flex justify-center align-center">
                    <button style={{ width: '2em' }} onClick={sendToBasket} className="m-4 border rounded-md hover:bg-red" >
                        +
                    </button>
                </div>

            </div>
        );
    };

    return <div id="selected-photo" className={`fixed top-4 left-0 w-3/4 flex items-start justify-center bg-opacity-90`}>
        <div className="rounded-lg shadow-lg flex flex-col md:flex-row select-none">
            <div>
                <div className="flex align-center justify-between">
                    <div className="pt-3" onClick={() => {
                        setIndex(index - 1);
                        setPreviousSelectedImage(images[index - 2]);
                        setNextSelectedImage(images[index + 2]);
                        setSelectedImage(previouseSelectedImage.default)
                    }}>
                        <ChevronLeft />
                    </div>
                    <div className="flex align-center justify-between">
                        <h2 className="text-2xl font-semibold text-center select-none pt-2 pl-1">
                            {getTitle(selectedImage)}
                        </h2>
                    </div>
                    <div className="pt-3" onClick={() => {
                        setIndex(index + 1);
                        setPreviousSelectedImage(images[index - 2]);
                        setNextSelectedImage(images[index + 2]);
                        setSelectedImage(nextSelectedImage.default)
                    }}>
                        <ChevronRight />
                    </div>
                    <span className="flex justify-center align-center p-2" onClick={() => {
                        setSelectedImage(null)
                    }}>
                        <CloseIcon />
                    </span>
                </div>

                <img
                    src={selectedImage}
                    alt={selectedImage}
                    className="max-w-70% select-none p-1"
                />
            </div>
            <div className="rounded-lg shadow-lg">
                <PhotoCanvasDetails />
            </div>
        </div>
    </div>;
}

export default SelectedPhoto;