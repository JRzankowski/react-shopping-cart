import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {TiDeleteOutline, TiChevronLeft, TiChevronRight} from 'react-icons/ti'
import {productQuantity, clearProduct} from '../actions/productQuantity'
import promoCode from "../actions/promoCode";

const CartWrapper = styled.div`
  max-width: 650px;
  justify-content: space-around;
  padding: 0 10px;
  margin: 50px auto 0;
`;
const CartHeader = styled.div`
    width: 100%;
    max-width: 650px;
    display: flex;
    border-bottom: 2px solid black;
    margin: 0 auto;
`;
const CartTitle = styled.h5`
  width: 55%;
`;
const CartPrice = styled.h5`
  width: 15%;
  display: block;
  @media(max-width: 444px){
    visibility: hidden;
    
  }
`;
const CartQuantity = styled.h5`
  width: 20%;
  display: block;
  @media(max-width: 444px){
    visibility: hidden;
  }
`;
const CartTotal = styled.h5`
  width: 10%;
  display: block;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-left: 15px;
  h4:last-of-type{
    font-weight: 400;
  }
  div{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    @media(max-width: 430px){
      border-bottom: 1px solid #a7a7a7;
      justify-content: space-between;
    }
  }
 
`;
const CartSummaryTitle = styled.span`
  width: 30%;
`;
const CartSummaryPrice = styled.span`
  width: 10%;
  font-weight: bold;
`;
const CartDeliveryTitle = styled.span`
  width: 30%;
`;
const CartDeliveryPrice = styled.span`
  width: 10%;
`;
const CartDiscountTitle = styled.span`
  width: 30%;
`;
const CartDiscountPrice = styled.span`
  width: 10%;
`;

const CartProducts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 15px;
`;
const CartProductWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #a7a7a7;
  margin-bottom: 10px;
`;
const CartProductInfo = styled.div`
  width: 55%;
  display: flex;
  align-items: center;
  position: relative;
  
  span{
    font-size: 15px;
     @media(max-width: 444px){
     font-size: 14px;
      position: absolute;
      top: -1px;
      left: 116px;
    }
  }
  span.product__price--number{
    display: none;
    @media(max-width: 444px){
    display: block;
    position: absolute;
    top: 35px;
    left: 0;
  }
  }
  svg.delete{
    position: absolute;
    font-size: 15px;
    height: 16px;
    width: 16px;
    left: -10px;
    cursor: pointer;
  }
  img{
    width: 85px;
    margin: 0 20px;
  }
  
`;
const CartProductPrice = styled.div`
  width: 15%;
  position: relative;
  @media(max-width: 444px){
    span{
      display: none;
     }
    }

  
`;
const CartProductQuantity = styled.div`
  width: 20%;
  position: relative;
  svg{
    cursor: pointer;
    position: relative;
    bottom: -3px;
  }
`;
const CartProductTotal = styled.div`
  display: flex;
  justify-content: flex-end;

`;
const CardPromoCode = styled.div`
  border-bottom: none !important;
  position: relative;
  left: -500px;
  div{
    position: absolute;
    left: 0;
  }
  input{
    margin-bottom: 20px;
    transition: all .5s ease;
    outline: none;
    box-shadow: none ;
    border: 0 ;
    color: #030303 ;
    letter-spacing: 2px;
    font-size: 14px;
  }
  button{
    color: #6b6b6b;
    background-color: transparent;
    padding: 5px;
    border: 1px dashed #6b6b6b;
    transition: .1s;
    &:hover{
      background-color: black;
      color: white;
      border-color: black;
    }
  }


`;


const Cart = ({basketProps, productQuantity, clearProduct,promoCode}) => {
    let productsInCart = [];

    const promoCodeCheck = (e) =>{
        promoCode(e.target.previousElementSibling.value);
        console.log(basketProps)
    };
    Object.keys(basketProps.products).forEach(function (item) {
        if (basketProps.products[item].inCart) {
            productsInCart.push(basketProps.products[item])
        }
    });

    productsInCart = productsInCart.map((product, index) => {
        let image = require(`../assets/images${product.photo}`);
        return (
            <>
                <CartProductWrapper className="product__container">
                    <CartProductInfo className="product__info">
                        <TiDeleteOutline onClick={() => clearProduct(product.id,"jshop25")} className='delete'/>
                        <img src={image} alt='image'/>
                        <span className="product__name">
                        {product.name}({product.size})
                            <span className="product__price--number">
                        ${product.price}
                        </span>
                    </span>
                    </CartProductInfo>
                    <CartProductPrice className="product__price">
                    <span className="product__price--number">
                        ${product.price}
                    </span>
                    </CartProductPrice>
                    <CartProductQuantity className="product__quantity">
                        <TiChevronLeft onClick={() => productQuantity('decrease', product.id)} className='decrease'/>
                        <span className='product__quantity'>{product.numbers}</span>
                        <TiChevronRight onClick={() => productQuantity('increase', product.id)} className='increase'/>
                    </CartProductQuantity>
                    <CartProductTotal className="product__total">
                        ${product.numbers * product.price}
                    </CartProductTotal>
                </CartProductWrapper>
            </>
        )
    });
    return (
        <CartWrapper>
            <CartHeader>
                <CartTitle>Products</CartTitle>
                <CartPrice>Price</CartPrice>
                <CartQuantity>Quantity</CartQuantity>
                <CartTotal>Total</CartTotal>
            </CartHeader>
            <CartProducts className="cart__product">
                {productsInCart}
            </CartProducts>
            <CartSummary>
                {
                    productsInCart.length > 0 ? (
                        <>
                            <CardPromoCode>
                                <div>
                                    <input placeholder="ENTER PROMOCODE" type="text"/>
                                    <button onClick={(e)=>promoCodeCheck(e)}>GO</button>
                                </div>

                            </CardPromoCode>
                            <div>
                                <CartDeliveryTitle>Delivery</CartDeliveryTitle>
                                <CartDeliveryPrice>$10</CartDeliveryPrice>

                            </div>
                            <div>
                                {basketProps.basketDiscount ? (
                                    <>
                                    <CartDiscountTitle>Discount</CartDiscountTitle>
                                    <CartDiscountPrice>{`-$${basketProps.basketDiscount}`}</CartDiscountPrice>
                                    </>
                                ): null}
                            </div>
                        </>
                    ) : null
                }
                <div>
                    <CartSummaryTitle>Basket total</CartSummaryTitle>
                    <CartSummaryPrice>${basketProps.cartCost}</CartSummaryPrice>
                </div>


            </CartSummary>
        </CartWrapper>
    )
};

const mapStateToProps = state => ({
    basketProps: state.basketState
});

export default connect(mapStateToProps, {productQuantity, clearProduct, promoCode})(Cart);