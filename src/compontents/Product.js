import React, {useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";

const StyledProduct = styled.div`
  width:${props => props.isChoosed ? "100%" : "200px"};
  position: ${props => props.isChoosed ? "" : "200px"};
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
    const {img, title, price, description, addToBasket, id, hover, sizes} = props;
    const [productChoose, setProductChoose] = useState(false);

    const showProductDetails = (e) => {
        e.persist();
        setProductChoose(true);
        let productType = title.includes("shirt") ? "product-shirt" : "product-hoodie";
        console.log(productType);

        for (let el of document.querySelectorAll(`.${productType}`)) {
            el.style.display = "none";
        }
        console.log(e.target);
        if(e.target.parentElement.classList.contains(productType)){
            e.target.parentElement.style.display="block"

        }
        if( e.target.classList.contains(productType)){
            e.target.style.display="block"
        }
    };
    return (
        <StyledProduct onClick={showProductDetails} isChoosed={productChoose}
                       className={title.includes("shirt") ? "product-shirt" : "product-hoodie"}>
            <ProductImage className='product__img' src={img} alt={title}
                          onMouseOver={(e) => e.target.src = hover}
                          onMouseOut={(e) => e.target.src = img}
            />
            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price}</ProductPrice>
            <ProductCart onClick={() => addToBasket(id)} href='#'> Add to cart</ProductCart>
        </StyledProduct>
    )
};
export default connect(null, {addToBasket})(Product);