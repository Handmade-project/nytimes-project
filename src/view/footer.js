import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Div = styled.div`
  border-radius: 10px;
  background-color: #F5F4F4;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  position : absolute;
  bottom: 0;
`;

const Copy = styled.div`
  font-size: 1em;
  margin: 0 auto;
  color: #97a2b5;
`;

function Footer() {
  let getYear = new Date().getFullYear();
  return (
    <Div>
      <Copy>
        Copyright {getYear}.&nbsp;
        <a href="https://github.com/Handmade-project" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} /> 3조 미니 프로젝트
        </a>{" "}
        All rights reserved.
      </Copy>
    </Div>
  );
}

export default Footer;