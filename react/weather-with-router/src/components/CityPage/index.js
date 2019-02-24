import React from 'react';

import { connect } from "react-redux";

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
    const { currentCity, changeWeather } = props;
    changeWeather(currentCity.data);
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

const mapDispatch = ({ weather: { changeWeather }}) => ({
    changeWeather: params => changeWeather(params),
});

export default connect(() => ({}), mapDispatch)(withCityFromCache(CityPage));
