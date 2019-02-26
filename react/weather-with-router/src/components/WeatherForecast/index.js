import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardWrapper, ForecastInfo, ForecasTitle } from "./styled";

export default class WeatherForecast extends Component {

    static defaultProps = {
        date: 'none',
        temperature: 'Nan',
        wind: 0,
        humidity: 0,
    };
    render() {
        return (
            <CardWrapper>
                <ForecasTitle>{new Date(this.props.date).toLocaleDateString()}</ForecasTitle>
                <ForecastInfo>
                    <span>температура, {this.props.temperature}°</span>
                    <span>ветер, {this.props.wind} м/с</span>
                    <span>влажность, {this.props.humidity}%</span>
                </ForecastInfo>
            </CardWrapper>
        );
    }
}

WeatherForecast.propTypes = {
    date: PropTypes.string,
    temperature: PropTypes.number,
    wind: PropTypes.number,
    humidity: PropTypes.number,
};
