import {ADD_PRODUCT_BASKET} from "./type";


const addToBasket = (productName)=>{
    return (dispatch) =>{
        dispatch({
            type: ADD_PRODUCT_BASKET,
            payload: productName
        })
    }
};

export default addToBasket
