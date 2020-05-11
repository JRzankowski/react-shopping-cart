import {ADD_PRODUCT_BASKET} from "./type";


const addToBasket = (productName,size)=>{
    console.log(productName,size);
    return (dispatch) =>{
        dispatch({
            type: ADD_PRODUCT_BASKET,
            payload: productName,
            size: size
        })
    }
};

export default addToBasket
