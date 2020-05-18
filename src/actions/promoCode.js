import { PROMO_CODE } from './type.js'

const promoCode = (code) =>{
    return(dispatch) =>{
        dispatch({
            type: PROMO_CODE,
            payload : code
        })

    }
};

export default promoCode;



