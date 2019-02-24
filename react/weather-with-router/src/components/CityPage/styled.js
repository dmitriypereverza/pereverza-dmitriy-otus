import styled from 'styled-components';

export const WeatherWrapper = styled.div`
  margin: 60px auto auto;
  width: 100%;
  min-height: 50px;
  background-color: #f3f3f3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
export const WeatherCard = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 40px;
  color: whitesmoke;
  background-color: #1a4d5d;
`;
export const WeatherTitle = styled.div`
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
 
`;
export const WeatherDate = styled.div`
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
 
`;
export const WeatherTemp = styled.div`
    font-size: 32px;
`;

export const WeatherFlow = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 20px;
`;
