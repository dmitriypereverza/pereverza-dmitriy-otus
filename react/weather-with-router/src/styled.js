import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        background: url("https://img.tsn.ua/cached/1533908229/tsn-8c5f6b23d1211bb14030cc3abd4583f7/thumbs/1340x530/f1/f5/b1bda47565097a258a500370b8f3f5f1.jpeg") no-repeat center center fixed;
        background-size: cover;
    }
    
    html::after {
        content: "";
        background-color: black;
        opacity: 0.5;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: -1;
    }
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


export const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    margin: auto;
    color: #1d1d1d;
    padding: 20px;
    font-family: Roboto, serif;
`;
