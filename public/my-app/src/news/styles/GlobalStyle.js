import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f0f2f5;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
