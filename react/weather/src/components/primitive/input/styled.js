import styled from 'styled-components';

export const WebflowWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    border-radius: 2px;
    background: rgba(57, 63, 84, 0.8);
    
    :after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        height: 2px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        background: linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6) 0% 0%;
        background-size: 500% auto;
        animation: gradient 3s linear infinite;
    }
`;

export const WebflowInput = styled.input`
    padding: 10px;
    color: #BFD2FF;
    font-size: 1.8rem;
    line-height: 2.4rem;
    vertical-align: middle;
`;


export const WebflowButton = styled.button`
    font-size:  16px;
    white-space: nowrap;
    vertical-align: middle;
    transition: color .25s;
    background-color: #57E6E6;
    padding: 10px;
    color: #1d1d1d;
    
    :hover {
        cursor: pointer;
    }
`;
