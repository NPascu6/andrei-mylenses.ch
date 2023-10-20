import { createSlice } from '@reduxjs/toolkit';

interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
}

interface ProductBasketState {
    products: Product[];
}

const initialState: ProductBasketState = {
    products: [],
};

const productBasketSlice = createSlice({
    name: 'productBasket',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) => p.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...product, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) => p.name === product.name);
            if (existingProduct && existingProduct.quantity === 1) {
                state.products = state.products.filter((p) => p.name !== product.name);
            } else if (existingProduct) {
                existingProduct.quantity -= 1;
            }
        }
    },
});

export const { addProduct, removeProduct } = productBasketSlice.actions;
export default productBasketSlice.reducer;