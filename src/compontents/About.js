import React, {useEffect} from "react";
import styled from "styled-components";
import image from '../assets/images/bg2.jpg'

const AboutWrapper = styled.section`
  width: 100%;
  text-align: center;
  margin-top: 35px;
  padding: 0 50px;
  margin-bottom: 100px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  background-image: url(${props => props.image});
  background-size: cover;
  position: relative;
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
}
`;

const AboutP = styled.p`
  margin-top: 40px;
  text-align: center;
`;

const AboutContact = styled.span`
  text-align: center;
  a{
    text-decoration: none;
    color: #8a8a8a;
    &:hover{
      color: darkred;
    }
  }

`;

const About = () => {
    useEffect(()=>{
        document.querySelector(".photo-about").classList.add("animation")
    });
    useEffect(() => {
        return () => {
            document.querySelector(".photo-about").classList.remove("animation")
        };
    });
    return (
        <AboutWrapper>
            <ImageWrapper className="photo-about" image={image}/>
            <AboutP>We create for you limited collections of clothes with high quality materials. Each product sew in
                Poland. The idea behind it, but now we germinated very long time. We would like for you to develop and
                fulfill your expectations of us, so every note or suggestion would be for us a very important piece of
                information, what should we do to make it even better.</AboutP>
            <AboutContact>Contact us: <a href="tel:+48 999 999 999">+48 999 999 999</a> (7.00 - 15.00) <span>or</span>
                <a href="mailto:jshop@gmail.com"> jshop@gmail.com</a> </AboutContact>
        </AboutWrapper>

    )
};
export default About