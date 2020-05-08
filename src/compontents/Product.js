import React, {useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";

const StyledProduct = styled.div`
  width: 200px;
  text-align: center;
  margin-bottom: 50px;
  cursor:pointer;
  padding-bottom: 20px;
  &:hover{
    background-color: whitesmoke;
  }
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
`;
const ProductTitle = styled.p`
  font-size: 1.1rem;
`;
const ProductPrice = styled.p`
  font-weight: bold;
`;
const ProductCart = styled.a`
  text-decoration: none;
  display: block;
  position: relative;
  z-index: 5;
  font-size: 1rem;
  color: black;
  transition: .1s;
  &:hover{
    color: darkred
  }
`;

const Product = (props) => {
    const {img, title, price, description,addToBasket, id,hover} = props;
    const [basketNumbers,setBasketNumbers] = useState(0);
    console.log(addToBasket);

    return (
        <StyledProduct className="product">
            <ProductImage className='product__img' src={img} alt={title}
                          onMouseOver={(e)=>e.target.src = hover}
                          onMouseOut ={(e)=>e.target.src = img}
            />
            <ProductTitle className='product__title'>{title}</ProductTitle>
            <ProductPrice className='product__price'>${price}</ProductPrice>
            <ProductCart onClick={()=>addToBasket(id)} className='product__cart' href='#'> Add to cart</ProductCart>
        </StyledProduct>
    )
};
export default connect(null,{addToBasket})(Product);