import React, {useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import addToBasket from "../actions/addAction";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const StyledProduct = styled.div`
  // width:${props => props.isChoosed ? "100%" : "200px"};
  // position: ${props => props.isChoosed ? "" : "200px"};
  text-align: center;
  margin-bottom: 50px;
  padding-bottom: 20px;
  &:hover{
    background-color: ${props => props.isChoosed ? "none" : "whitesmoke"};
  }
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  &.product__hover{
    display: ${props => props.isChoosed ? "block" : "none"};
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
  margin-top: ${props=>props.isChoosed ? "30px" : null};

  &:hover{
    color: darkred;
    background-color: ${props=>props.isChoosed ? "whitesmoke" : null};
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
        if (e.target.parentElement.classList.contains(productType)) {
            e.target.parentElement.style.display = "block"
        }
        if (e.target.classList.contains(productType)) {
            e.target.style.display = "block"
        }
    };
    const chooseInfo = (e)=>{
        for(let el of document.querySelectorAll(".details")){
            el.classList.remove("show")
        }
        e.target.classList.add("show");
        if(e.target.classList.contains("info")){
            document.querySelector(".details-info").classList.add("show");
            document.querySelector(".sizes-info").classList.remove("show");
        }else{
            document.querySelector(".sizes-info").classList.add("show");
            document.querySelector(".details-info").classList.remove("show");
        }

    };
    return (
        <StyledProduct isChoosed={productChoose}
                       className={title.includes("shirt") ? "product-shirt" : "product-hoodie"}>
            {productChoose ? (
                <Zoom>
                    <ProductImage className='product__img' src={img} alt={title}
                                  onMouseOver={(e) => !productChoose ? e.target.src = hover : null}
                                  onMouseOut={(e) => !productChoose ? e.target.src = img : null}
                    />
                </Zoom>
            ) : (
                <ProductImage className='product__img' src={img} alt={title}
                              onMouseOver={(e) => !productChoose ? e.target.src = hover : null}
                              onMouseOut={(e) => !productChoose ? e.target.src = img : null}
                />
            )}
            <Zoom>
                <ProductImage className='product__hover' src={hover} alt={title} isChoosed={productChoose}/>
            </Zoom>

            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price}</ProductPrice>
            {
                productChoose ? (
                    <ProductInfoWrapper>
                        <ProductInfoHeading>
                            <span className="details show info" onClick={chooseInfo}>details</span>
                            <span className="details sizes" onClick={chooseInfo}>size guide</span>
                        </ProductInfoHeading>
                        <ProductInfoDetails>
                            <ProductDetails className="details-info show">
                                <li>100% COTTON</li>
                                <li>CLASSIC FIT</li>
                            </ProductDetails>
                            <ProductSizes className="sizes-info">
                                <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                </tr>
                                <tr>
                                    <td>LENGTH</td>
                                    <td>70</td>
                                    <td>72</td>
                                    <td>74</td>
                                    <td>76</td>
                                </tr>
                                <tr>
                                    <td>CHEST</td>
                                    <td>54</td>
                                    <td>57</td>
                                    <td>60</td>
                                    <td>63</td>
                                </tr>
                                </tbody>
                            </ProductSizes>
                        </ProductInfoDetails>
                    </ProductInfoWrapper>

                ): null
            }
            <ProductCart isChoosed={productChoose} onClick={productChoose ? () => addToBasket(id) : showProductDetails} href='#'> {productChoose ? "Add to cart" : "More info"}</ProductCart>

        </StyledProduct>
    )
};
export default connect(null, {addToBasket})(Product);