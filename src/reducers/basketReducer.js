import {
    ADD_PRODUCT_BASKET,
    DECREASE_QUANTITY,
    GET_NUMBERS_BASKET,
    INCREASE_QUANTITY,
    CLEAR_PRODUCT,
    PROMO_CODE
} from "../actions/type";


const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    deliveryCost: false,
    basketDiscount: false,
    products: {
        90026: {
            id: "90026",
            name: "stoic t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s1front.png",
            size: null
        },
        73513: {
            id: "73513",
            name: "sunrise t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s2front.png",
            size: null
        },
        12566: {
            id: "12566",
            name: "clouds t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s3front.png",
            size: null
        },
        20952: {
            id: "20952",
            name: "buddhism t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s4front.png",
            size: null
        },
        69331: {
            id: "69331",
            name: "landscape t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s5front.png",
            size: null
        },
        94460: {
            id: "94460",
            name: "point t-shirt",
            price: 25,
            numbers: 0,
            inCart: false,
            photo: "/s6front.png",
            size: null
        },
        34261: {
            id: "34261",
            name: "money hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h1front.png",
            size: null
        },
        88212: {
            id: "88212",
            name: "wave hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h2front.png",
            size: null
        },
        71715: {
            id: "71715",
            name: "mechanic hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h3front.png",
            size: null
        },
        48231: {
            id: "48231",
            name: "together hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h4front.png",
            size: null
        },
        43692: {
            id: "43692",
            name: "ornament hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h5front.png",
            size: null
        },
        46681: {
            id: "46681",
            name: "cool guy hoodie",
            price: 50,
            numbers: 0,
            inCart: false,
            photo: "/h6front.png",
            size: null
        }
    }
};

export default (state = initialState, action) => {
    let productSelected = null;
    switch (action.type) {
        case ADD_PRODUCT_BASKET:
            productSelected = {...state.products[action.payload]};
            productSelected.numbers += 1;
            productSelected.inCart = true;
            productSelected.size = action.size;
            if (!state.deliveryCost) {
                return {
                    ...state,
                    basketNumbers: state.basketNumbers + 1,
                    cartCost: state.cartCost + state.products[action.payload].price + 10,
                    deliveryCost: true,
                    products: {
                        ...state.products,
                        [action.payload]: productSelected
                    }
                };
            } else {
                return {
                    ...state,
                    basketNumbers: state.basketNumbers + 1,
                    cartCost: state.cartCost + state.products[action.payload].price,
                    products: {
                        ...state.products,
                        [action.payload]: productSelected
                    }
                };
            }

        case GET_NUMBERS_BASKET:
            return {
                ...state
            };
        case INCREASE_QUANTITY:
            productSelected = {...state.products[action.payload]};
            productSelected.numbers += 1;

            return {
                ...state,
                cartCost: state.cartCost + state.products[action.payload].price,
                basketNumbers: state.basketNumbers + 1,
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            };
        case DECREASE_QUANTITY:
            productSelected = {...state.products[action.payload]};
            let newCartCost = 0;
            let newBasketNumbers = 0;
            if (productSelected.numbers === 1) {
                productSelected.numbers = 1;
                newCartCost = state.cartCost;
                newBasketNumbers = state.basketNumbers;
            } else {
                productSelected.numbers -= 1;
                newCartCost = state.cartCost - state.products[action.payload].price;
                newBasketNumbers = state.basketNumbers - 1
            }

            return {
                ...state,
                cartCost: newCartCost,
                basketNumbers: newBasketNumbers,
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            };
        case CLEAR_PRODUCT:
            productSelected = {...state.products[action.payload]};
            let numbersBackup = productSelected.numbers;
            productSelected.numbers = 0;
            productSelected.inCart = false;
            return {
                ...state,
                basketNumbers: state.basketNumbers - numbersBackup,
                cartCost: state.cartCost - (numbersBackup * productSelected.price),
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            };
        case PROMO_CODE:
            if (action.payload === "jshopDelivery") {
                return {
                    ...state,
                    basketDiscount: 10,
                    cartCost: state.cartCost - 10
                }
            }else{
                return{
                    ...state,
                    basketDiscount: null,

                }
            }


        default:
            return state;
    }
}