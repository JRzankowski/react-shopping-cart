import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";
import Zoom from 'react-medium-image-zoom'
import {Link} from "react-router-dom";
import 'react-medium-image-zoom/dist/styles.css'
import useOutsideClick from "./useOutsideRef";

const StyledProduct = styled.div`
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
  position: relative;
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
const ProductPopup = styled.div`
  display: ${props=>props.active ? "block" : "none"};
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4);
`;
const PopupContent = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 20px;
  @media(max-width: 438px){
    width: 70%;
  }
  p{
    font-size: 15px;
    span{
      color: darkred;
    }
  }
  a{
    display: block;
    font-size: 16px;
    text-decoration: none;
    color: black;
    &:hover{
      color: darkred;
      background-color: whitesmoke ;
    }
    
  }
`;
const PopupContentSpan=styled.span`
  display: block;
  margin: 12px 0 ;
  color: #353535;
`;
const PopupContentP=styled.span`
    display: block;
    font-size: 16px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    &:hover{
      color: darkred;
      background-color: whitesmoke ;
    }
`;



const ProductDetails = (props) => {
    const {match, location, addToBasket} = props;
    const {img, title, price, description, id, hover, sizes} = location.state;
    const {params: {productName}} = match;
    const [popupActive, setPopupActive] = useState(false);
    const [sizeChoose, setSizeChoose] = useState("S");
    const setPopup = () =>{
        setPopupActive(true);
    };
    const setSize = (e) => {
        setSizeChoose(e.target.value);
    };
    const addToBasketBtn = (id, sizeChoose) => {
        addToBasket(id, sizeChoose);
        setPopup();
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
    const ref = useRef();

    useOutsideClick(ref, () => {
        if (popupActive) {
            setPopupActive(false)
        }
    });
    return (
        <StyledProduct className="t-shirt">
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
            <ProductCart onClick={() => addToBasketBtn(id, sizeChoose)}>Add to cart</ProductCart>
            <ProductPopup className="popup" active={popupActive} onClick={()=>setPopup}>
                <PopupContent ref={ref}>
                    <p>You added <span>{title}({sizeChoose})</span> to your cart !</p>
                    <PopupContentP onClick={()=>setPopupActive(false)}>continue shopping</PopupContentP>
                    <PopupContentSpan>or</PopupContentSpan>
                    <Link to="/cart">go to the cart</Link>
                </PopupContent>
            </ProductPopup>


        </StyledProduct>
    )
};
export default connect(null, {addToBasket})(ProductDetails);