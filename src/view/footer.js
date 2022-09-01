import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Div = styled.div`
  border-radius: 10px;
  background-color: #262d3d;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Copy = styled.div`
  font-size: 1em;
  margin-left: 1em;
  color: #97a2b5;
`;

function Footer() {
  return (
    <Div>
      <Copy>
        Copyright 2022.&nbsp;
        <a href="https://github.com/Handmade-project" target="_blank">
          <FontAwesomeIcon icon={faGithub} /> 3조 미니 프로젝트
        </a>{" "}
        All rights reserved.
      </Copy>
    </Div>
  );
}

export default Footer;
