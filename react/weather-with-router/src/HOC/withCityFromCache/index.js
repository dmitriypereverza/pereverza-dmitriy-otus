import React from 'react';

import { updateWeather } from "../../utils/cityHelper";

export function withCityFromCache(WrappedComponent) {
    return class extends React.Component {
        state = {
            cityStorage: null,
            currentCity: null,
        };

        componentWillMount() {
            let cacheCity = this.getStorage();
            if (!cacheCity) {
                return;
            }
            let currentCity = cacheCity.find(city => city.code === this.props.match.params.code);
            if (currentCity) {
                cacheCity = cacheCity.filter(city => city.code !== this.props.match.params.code);
                const city = updateWeather(currentCity);
                cacheCity.unshift(city);
                this.saveStorage(cacheCity);
                this.setState({ currentCity: city });
            }
            this.setState({ cityStorage: cacheCity });
        }

        saveStorage(obj) {
            localStorage.setItem('favoriteCity', JSON.stringify(obj || []));
            this.setState({ cityStorage: this.getStorage() });
        }

        getStorage() {
            return JSON.parse(localStorage.getItem('favoriteCity'));
        }

        render() {
             return <WrappedComponent
                 {...this.state}
                 saveStorage={this.saveStorage.bind(this)}
                 getStorage={() => this.getStorage()}
                 {...this.props}
             /> ;
        }
    }
}

export default withCityFromCache;
