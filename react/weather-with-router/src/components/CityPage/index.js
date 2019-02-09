import React from 'react';

import {
    WeatherCard,
    WeatherDate,
    WeatherFlow,
    WeatherTemp,
    WeatherTitle,
    WeatherWrapper
} from "./styled";
import Wrapper from "../primitive/wrapper";
import WeatherForecast from "../WeatherForecast";
import {updateWeather} from "../../utils/cityHelper";

export default class CityPage extends React.Component {
    state = {
        currentCity: null
    };

    componentDidMount() {
        let cacheCity = JSON.parse(localStorage.getItem('favoriteCity'));
        if (!cacheCity) {
            return;
        }
        let currentCity = cacheCity.find(city => city.code === this.props.match.params.code);
        cacheCity = cacheCity.filter(city => city.code !== this.props.match.params.code);
        const city = updateWeather(currentCity);
        cacheCity.unshift(city);
        localStorage.setItem('favoriteCity', JSON.stringify(cacheCity));
        this.setState({ currentCity: city });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currentCity !== nextState.currentCity
    }

    render() {
        const { currentCity } = this.state;
        return currentCity && (
          <WeatherWrapper>
              <WeatherCard>
                  <WeatherTitle>{ currentCity.name }</WeatherTitle>
                  <WeatherDate>{ new Date(currentCity.date).toLocaleDateString() }</WeatherDate>
                  <WeatherTemp>{ currentCity.data.temperature } `C</WeatherTemp>

                  <Wrapper column>
                      <div>температура, {currentCity.data.temperature}°</div>
                      <div>ветер, {currentCity.data.wind} м/с</div>
                      <div>влажность, {currentCity.data.humidity}%</div>
                  </Wrapper>
        
              </WeatherCard>
              <WeatherFlow>
                  {currentCity.forecast.map((forecast, index) => <WeatherForecast key={index}  {...forecast} />)}
              </WeatherFlow>
          </WeatherWrapper>
        );
    }
}
