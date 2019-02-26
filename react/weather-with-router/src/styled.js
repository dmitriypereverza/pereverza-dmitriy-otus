import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
    input { border-style: none; background: transparent; outline: none; }
    button { padding: 0; background: none; border: none; outline: none; }
    h1 {
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        text-transform: uppercase;
        color: whitesmoke;
    }
    a {
      text-decoration: none;   
          
      :visited { color: white; }    
      :link { color: white; }
      :hover { color: #57E6E6;}
    }
`;

export const PageWrapper = styled.div`
    background: url(${props => props.backgroundUrl}) no-repeat center center fixed;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -2;
    
    :after {
        content: "";
        background-color: black;
        opacity: 0.3;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: -1;
    }
`;

export const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    margin: auto;
    color: #1d1d1d;
    padding: 20px;
    font-family: Roboto, serif;
`;
