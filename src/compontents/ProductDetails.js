import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";
import Zoom from 'react-medium-image-zoom'
import Popup from "reactjs-popup";
import 'react-medium-image-zoom/dist/styles.css'

const StyledProduct = styled.div`
  // width:${props => props.isChoosed ? "100%" : "200px"};
  // position: ${props => props.isChoosed ? "" : "200px"};
  text-align: center;
  margin-bottom: 50px;
  padding-bottom: 20px;
  margin-top: 30px;
  &:hover{

  }
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  &.product__hover{
    display: block;
`;
const ProductTitle = styled.p`
  font-size: 1.1rem;
`;
const ProductPrice = styled.p`
  font-weight: bold;
`;
const ProductCart = styled.button`
  border: none;
  background-color: transparent;
  display: inline-block;
  text-decoration: none;
  //display: block;
  position: relative;
  z-index: 5;
  font-size: 1rem;
  color: black;
  transition: .1s;
  margin-top: 30px;

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
const ProductDetail = styled.div`
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


const ProductDetails = (props) => {
    const {match, location, addToBasket} = props;
    const {img, title, price, description, id, hover, sizes} = location.state;
    const {params: {productName}} = match;
    const [productChoose, setProductChoose] = useState(false);
    const [sizeChoose, setSizeChoose] = useState("S");
    const setSize = (e) => {
        setSizeChoose(e.target.value);
    };
    const addToBasketBtn = (id, sizeChoose) => {
        addToBasket(id, sizeChoose);
        setProductChoose(false);
        let productType = title.includes("shirt") ? "product-shirt" : "product-hoodie";
        for (let el of document.querySelectorAll(`.${productType}`)) {
            el.style.display = "block";
        }
    };
    const chooseInfo = (e) => {
        for (let el of document.querySelectorAll(".details")) {
            el.classList.remove("show")
        }
        e.target.classList.add("show");
        if (e.target.classList.contains("info")) {
            document.querySelector(".details-info").classList.add("show");
            document.querySelector(".sizes-info").classList.remove("show");
        } else {
            document.querySelector(".sizes-info").classList.add("show");
            document.querySelector(".details-info").classList.remove("show");
        }

    };
    return (
        <StyledProduct isChoosed={productChoose}
                       className="t-shirt">
            <Zoom>
                <ProductImage className='product__img' src={img} alt={title}/>
            </Zoom>
            <Zoom>
                <ProductImage className='product__hover' src={hover} alt={title}/>
            </Zoom>

            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price}</ProductPrice>
                        <select value={sizeChoose} onChange={setSize}>
                            {
                                Object.keys(sizes).map(function (value, index) {

                                    return (
                                        <>
                                            <option value={value} key={index}>{value}</option>
                                        </>
                                    )
                                })

                            }
                        </select>
                        <ProductInfoWrapper>
                            <ProductInfoHeading>
                                <span className="details show info" onClick={chooseInfo}>details</span>
                                <span className="details sizes" onClick={chooseInfo}>size guide</span>
                            </ProductInfoHeading>
                            <ProductInfoDetails>
                                <ProductDetail className="details-info show">
                                    <li>100% COTTON</li>
                                    <li>CLASSIC FIT</li>
                                </ProductDetail>
                                <ProductSizes className="sizes-info">
                                    <tbody>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>S</td>
                                        <td>M</td>
                                        <td>L</td>
                                        <td>XL</td>
                                        <td>XXL</td>
                                    </tr>

                                    <tr>
                                        <td>LENGTH</td>
                                        <td>70</td>
                                        <td>72</td>
                                        <td>74</td>
                                        <td>76</td>
                                        <td>80</td>
                                    </tr>
                                    <tr>
                                        <td>CHEST</td>
                                        <td>54</td>
                                        <td>57</td>
                                        <td>60</td>
                                        <td>63</td>
                                        <td>66</td>
                                    </tr>
                                    </tbody>
                                </ProductSizes>
                            </ProductInfoDetails>
                        </ProductInfoWrapper>
                        <ProductCart onClick={()=>addToBasketBtn(id, sizeChoose)} >Add to cart</ProductCart>
        </StyledProduct>
    )
};
export default connect(null, {addToBasket})(ProductDetails);