import React from 'react';

import { updateWeather } from "../../utils/cityHelper";

export function withCityFromCache(WrappedComponent) {
    return class extends React.Component {
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

        render() {
             return <WrappedComponent currentCity={this.state.currentCity} {...this.props} /> ;
        }
    }
}

export default withCityFromCache;
