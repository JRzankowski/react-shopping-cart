import { INCREASE_QUANTITY, DECREASE_QUANTITY,CLEAR_PRODUCT } from './type.js'

export const productQuantity = (action, productName) =>{
    return(dispatch) =>{
        dispatch({
            type: action === "increase" ? INCREASE_QUANTITY : DECREASE_QUANTITY,
            payload : productName
        })

    }
};

export const clearProduct = (productName) =>{
    console.log(productName);
    return(dispatch) =>{
        dispatch({
            type: CLEAR_PRODUCT,
            payload : productName,
        })

    }
};

