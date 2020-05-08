import {GET_NUMBERS_BASKET} from "./type";

export const getNumbers = () =>{
    return (dispatch) =>{
        dispatch({
            type: GET_NUMBERS_BASKET,
        })
    }
};