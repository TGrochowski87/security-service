import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-family: 'Roboto', sans-serif;

    --blue: #6a97eb;
  }

  html, body, #root, .app{
    height: 100%;
  }

  .highlighted-text{
    color: var(--blue);
    font-weight: bolder;
  }
`;

export default GlobalStyles;
