import React from 'react';

import {
    WeatherAttrs,
    WeatherCard,
    WeatherFlow,
    WeatherTemp,
    WeatherTitle,
    WeatherWrapper
} from "./styled";

export default class CityPage extends React.Component {
    state = {
        currentCity: null
    };

    componentDidMount() {
        let cacheCity = JSON.parse(localStorage.getItem('favoriteCity'));
        if (cacheCity) {
            let currentCity = cacheCity.find(city => city.code === this.props.match.params.code);
            console.log(currentCity);
            this.setState({ currentCity: currentCity });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currentCity !== nextState.currentCity;
    }

    render() {
        const { currentCity } = this.state;
        return currentCity && (
          <WeatherWrapper>
              <WeatherCard>
                  <WeatherTitle>{ currentCity.name }</WeatherTitle>
                  <WeatherTemp>{ currentCity.data.temperature } `C</WeatherTemp>
                  <WeatherAttrs>
                      <span>{ currentCity.data.temperature }</span>
                      <span>{ currentCity.data.wind }</span>
                      <span>{ currentCity.data.humidity }</span>
                  </WeatherAttrs>
              </WeatherCard>
              <WeatherFlow>1</WeatherFlow>
          </WeatherWrapper>
        );
    }
}