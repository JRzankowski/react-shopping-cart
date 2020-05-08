import React from "react";
import data from "../data/clothes"
import Product from "./Product";
import styled from "styled-components";

const ShirtsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px auto;
  max-width: 750px;
  @media(min-width: 400px){
    justify-content: space-evenly;
  }
`;

const Shirts  = (props) => {

    return (
        <ShirtsWrapper className='home'>
            {
                data.tShirts.map((value, index) => {
                    let image = require(`../assets/images${value.photo}`);
                    let hoverImage = require(`../assets/images/s1back.png`);
                    return (
                        <>
                            <Product img={image}
                                     title={value.name}
                                     price={value.price}
                                     descritpion={value.description}
                                     key={index}
                                     id={value.id}
                                     type={value.type}
                                     hover={hoverImage}
                            />
                        </>
                    )
                })
            }
        </ShirtsWrapper>
    )
};

export default Shirts