import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #626262;
  font-size: 13px;
  height: 40px;
  
`;


const Footer = () =>{
  return(
      <FooterWrapper>
          <span>Bulit by Jędrzej Rzankowski</span>
      </FooterWrapper>
  )
};

export default Footer