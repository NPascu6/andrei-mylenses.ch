import { createSlice } from '@reduxjs/toolkit';

interface Product {
    title: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    size: string;
}

interface ProductBasketState {
    products: Product[];
    showToaster: boolean;
    toasterMessage?: string;
}

const initialState: ProductBasketState = {
    products: [],
    showToaster: false,
    toasterMessage: '',
};

const productBasketSlice = createSlice({
    name: 'productBasket',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) => p.title === product.title);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...product, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) => p.title === product.title);
            if (existingProduct && existingProduct.quantity === 1) {
                state.products = state.products.filter((p) => p.title !== product.title);
            } else if (existingProduct) {
                existingProduct.quantity -= 1;
            }
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        showToaster: (state, action) => {
            state.showToaster = action.payload;
        },
        setToasterMessage: (state, action) => {
            state.toasterMessage = action.payload;
        }
    },
});

export const { addProduct, removeProduct, showToaster, setToasterMessage, setProducts } = productBasketSlice.actions;
export default productBasketSlice.reducer;