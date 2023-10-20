import { Dispatch } from "react";
import { RootState } from "../store";
import { ThunkDispatch } from "redux-thunk";

export const sendOrder = () => async (dispatch: ThunkDispatch<RootState, undefined, any>, getState: () => RootState) => {
    // create a function that will send an order to an email address

    // get the products from the state
    const products = getState().productBasket.products;

    // send the order as an email to the email address

    

    const res = await fetch('https://example.com/orders', {
        method: 'POST',
        body: JSON.stringify(products),
    });



} 