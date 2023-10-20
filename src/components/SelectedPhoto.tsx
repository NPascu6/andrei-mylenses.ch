import { useDispatch } from "react-redux";
import { addProduct } from "../store/productBasketSlice";

const SelectedPhoto = ({ selectedImage }: any) => {
    const getTitle = (image: any) => {
        const title = image.split('/').pop()?.split('.')[0];
        return title?.replace(/-/g, ' ');
    }

    const PhotoCanvasDetails = () => {
        const dispatch = useDispatch();

        const handleAdd = () => {
            dispatch(addProduct(getTitle(selectedImage)))
        }

        return (
            <div className="bg-white rounded-md shadow-md p-2 h-1/3 bg-gray-200">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="text-lg font-semibold text-black">$99.99</div>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        className="w-full py-2 px-2 border rounded-md"
                        placeholder="1"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-medium text-gray-700">Size</label>
                    <select
                        className="py-2 px-2 border rounded-md text-gray-700 w-full"
                        defaultValue="16x20"
                    >
                        <option value="8x10">8x10</option>
                        <option value="16x20">16x20</option>
                        <option value="24x36">24x36</option>
                    </select>
                </div>
                <button onClick={handleAdd} className="bg-black text-white px-4 py-2 rounded-md w-full">
                    +
                </button>
            </div>
        );
    };

    return <div className={`fixed top-4 left-0 w-3/4 h-2/4 flex items-start justify-center bg-black bg-opacity-90`}>
        <div className="rounded-lg shadow-lg flex flex-col md:flex-row select-none">
            <h2 className="text-2xl font-semibold mb-3 text-center text-white select-none">
                {getTitle(selectedImage)}
            </h2>
            <img
                src={selectedImage}
                alt={selectedImage}
                className="max-h-1/4 max-w-full select-none"
            />
            <div className="rounded-lg shadow-lg">
                <PhotoCanvasDetails />
            </div>
        </div>
    </div>;
}

export default SelectedPhoto;