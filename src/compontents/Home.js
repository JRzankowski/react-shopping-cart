import React, {useEffect} from "react";
import styled from "styled-components";
import image from '../assets/images/bg1.jpg'

const HomeWrapper = styled.section`
  width: 100%;
  text-align: center;
  margin-top: 35px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  background-image: url(${props => props.image});
  background-size: cover;
  position: relative;
  image-rendering: pixelated;
  
  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    mask-position: 50% 50%;
    transition:  3s;
  }
  &.animation{
    &,
    &:after,
    &:before {
      background: url(${props => props.image});
      background-size: cover;
     }

    &:after,
    &:before {
      mask-image: repeating-radial-gradient(white, white 1em, transparent 0, transparent 2em);;
      mask-size: calc(153px * .45) calc(36px * 1.5);
      mask-position: 150% 50%;
     }

    &:after {
      background-position: -.5vw -.5vw;
      mask-image: linear-gradient(to left top, white 51%, rgba(0,0,0,0) 0);
    }
  }
  
`;

const Home = () => {
    useEffect(()=>{
       document.querySelector(".photo").classList.add("animation")
    });
    useEffect(() => {
        return () => {
            document.querySelector(".photo").classList.remove("animation")
        };
    });
    return (
        <HomeWrapper>
            <ImageWrapper className="photo" image={image}/>

        </HomeWrapper>

    )
};
export default Home