import React from 'react';

import Wrapper from "../primitive/wrapper";
import WeatherForecast from "../WeatherForecast";

import { withCityFromCache } from "../../HOC/withCityFromCache";

import {
    WeatherCard,
    WeatherDate,
    WeatherFlow,
    WeatherTemp,
    WeatherTitle,
    WeatherWrapper
} from "./styled";

export const CityPage = props => {
    const { currentCity } = props;
    return currentCity && (
      <WeatherWrapper>
          <WeatherCard>
              <WeatherTitle>{ currentCity.name }</WeatherTitle>
              <WeatherDate>{ new Date(currentCity.date).toLocaleDateString() }</WeatherDate>
              <WeatherTemp>{ currentCity.data.temperature } °C</WeatherTemp>
              <Wrapper column>
                  <div>ветер, {currentCity.data.wind} м/с</div>
                  <div>влажность, {currentCity.data.humidity}%</div>
              </Wrapper>

          </WeatherCard>
          <WeatherFlow>
              {currentCity.forecast.map((forecast, index) => <WeatherForecast key={index}  {...forecast} />)}
          </WeatherFlow>
      </WeatherWrapper>
    );
};

export default withCityFromCache(CityPage);
