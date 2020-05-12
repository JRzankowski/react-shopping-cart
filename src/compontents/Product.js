import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {Link} from "react-router-dom";

const StyledProduct = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding-bottom: 20px;
  &:hover{
    background-color: whitesmoke;
  }
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  &.product__hover{
    display: none;
`;
const ProductTitle = styled.p`
  font-size: 1.1rem;
`;
const ProductPrice = styled.p`
  font-weight: bold;
`;
const ProductCart = styled(Link)`
  border: none;
  background-color: transparent;
  display: inline-block;
  text-decoration: none;
  position: relative;
  z-index: 5;
  font-size: 1rem;
  color: black;
  transition: .1s;
  &:hover{
    color: darkred;
    background-color: whitesmoke;
  }
`;
const ProductInfoWrapper = styled.div`
  margin-top: 15px;

`;
const ProductInfoHeading = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  span{
    cursor:pointer;
    color: #636363;
    &:hover{
      color: darkred;
    }
  }
  span.show{
    border-bottom: 1px solid black;
    color: black;
  }
  span:nth-of-type(1){
    margin-right: 10px;
  }
  span:nth-of-type(2){
    margin-left: 10px;
  }
 
`;
const ProductInfoDetails = styled.div`
`;
const ProductDetails = styled.div`
  display: none;
  &.show{
    display: block;
  }
`;
const ProductSizes = styled.table`
  display: none;
  &.show{
    display: inline-block;
  }
  margin: 0 auto;
  border-collapse: collapse;
  th,td{
    border: 1px solid #646464;
    padding: 7px;
  }
`;


const Product = (props) => {
    const {img, title, price, description, addToBasket, id, hover, sizes} = props;

    return (
        <StyledProduct
                       className={title.includes("shirt") ? "product-shirt" : "product-hoodie"}>

            <ProductImage className='product__img' src={img} alt={title}
                          onMouseOver={(e) => hover }
                          onMouseOut={(e) => img }
            />
            <Zoom>
                <ProductImage className='product__hover' src={hover} alt={title}/>
            </Zoom>

            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price}</ProductPrice>
            <ProductCart to={{
                pathname: `/${id}`,
                state: {
                    title: title,
                    price: price,
                    img:img,
                    id: id,
                    hover: hover,
                    sizes: sizes
                }
            }}>More info</ProductCart>

        </StyledProduct>
    )
};
export default connect(null, {addToBasket})(Product);