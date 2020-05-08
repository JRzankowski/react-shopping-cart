import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {TiDeleteOutline, TiChevronLeft, TiChevronRight} from 'react-icons/ti'
import {productQuantity, clearProduct} from '../actions/productQuantity'

const CartWrapper = styled.div`
  max-width: 650px;
  justify-content: space-around;
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
  width: 45%;
`;
const CartPrice = styled.h5`
  width: 15%;
`;
const CartQuantity = styled.h5`
  width: 30%;
`;
const CartTotal = styled.h5`
  width: 10%;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CartSummaryTitle = styled.h4`
  width: 30%;
`;
const CartSummaryPrice = styled.h4`
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
  width: 45%;
  display: flex;
  align-items: center;
  span{
    font-size: .9rem;
  }
  .delete{
    font-size: 1.1rem;
    cursor: pointer;
  }
  img{
    width: 85px;
    margin: 0 20px;
  }
  
`;
const CartProductPrice = styled.div`
  width: 15%;
`;
const CartProductQuantity = styled.div`
  width: 30%;
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



const Cart = ({basketProps,productQuantity,clearProduct}) => {
    let productsInCart = [];

    Object.keys(basketProps.products).forEach(function (item) {
        if (basketProps.products[item].inCart) {
            productsInCart.push(basketProps.products[item])
        }
    });
    productsInCart = productsInCart.map((product, index) => {
        let image = require(`../assets/images${product.photo}`);
        console.log(product.price);
        return (
            <>
                <CartProductWrapper className="product__container">
                    <CartProductInfo className="product__info">
                        <TiDeleteOutline onClick={()=> clearProduct(product.id)} className='delete'/>
                        <img src={image} alt='image'/>
                        <span className="product__name">
                        {product.name}
                    </span>
                    </CartProductInfo>
                    <CartProductPrice className="product__price">
                    <span className="product__price--number">
                        ${product.price}
                    </span>
                    </CartProductPrice>
                    <CartProductQuantity className="product__quantity">
                        <TiChevronLeft onClick={()=> productQuantity('decrease',product.id)} className='decrease'/>
                        <span className='product__quantity'>{product.numbers}</span>
                        <TiChevronRight onClick={()=> productQuantity('increase',product.id)} className='increase'/>
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
                <CartTitle>Product</CartTitle>
                <CartPrice>Price</CartPrice>
                <CartQuantity>Quantity</CartQuantity>
                <CartTotal>Total</CartTotal>
            </CartHeader>
            <CartProducts className="cart__product">
                {productsInCart}
            </CartProducts>
            <CartSummary>
                <CartSummaryTitle>Basket total</CartSummaryTitle>
                <CartSummaryPrice>${basketProps.cartCost}</CartSummaryPrice>
            </CartSummary>
        </CartWrapper>
    )
};

const mapStateToProps = state =>({
    basketProps: state.basketState
});

export default connect(mapStateToProps,{productQuantity,clearProduct})(Cart);