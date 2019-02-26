import styled from 'styled-components';

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #070807;
    color: whitesmoke;
    border: 1px solid whitesmoke;
    max-width: 300px;
    min-width: 200px;
    margin-right: 20px;

    border-radius: 10px;
    box-shadow: 0 4px 21px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    overflow: hidden;
`;

export const ForecasTitle = styled.div`
    padding: 15px 15px 0 15px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
`;

export const ForecastInfo = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
`;
