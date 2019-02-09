import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Alert from "react-s-alert";

import SearchBar from "../primitive/input";
import CityList from "../CityList";

import {generateCity} from "../../utils/cityHelper";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import withCityFromCache from "../../HOC/withCityFromCache";

const testData = ["Москва", "Ростов-на-Дону", "Омск"];

const alertSettings = {position: 'top', effect: 'slide',  timeout: 1000};
function customAlert(text, isError = false) {
    isError ? Alert.error(text, alertSettings) : Alert.success(text, alertSettings);
}

class Home extends Component {
    componentDidMount() {
        if (!this.props.cityStorage) {
            this.props.saveStorage(testData.map(generateCity));
        }
    }

    addCity = (value) => {
        if (!value) {
            customAlert('Введите имя города', true);
            return;
        }

        const existCity = this.props.cityStorage.find((city) => {
            return city.name === value;
        });
        if (existCity) {
            customAlert(`Город ${value} в списке уже есть`, true);
            return;
        }

        this.props.saveStorage([ ...this.props.getStorage(), generateCity(value)]);
        customAlert(`Город ${value} добавлен в список`);
    };

    removeCity = cityName => {
        console.log(cityName);
        const newCities = this.props.cityStorage.slice();
        this.props.cityStorage.forEach((item, index) => {
            if (item.name === cityName) {
                newCities.splice(index, 1);
                this.props.saveStorage(newCities);
                customAlert(`Город ${cityName} удален из списка`);
                return;
            }
        });
    };

    onClickSuggest(city) {
        this.props.history.push(`/city/${city.code}`);
    }

    render() {
        console.log(this.props);
        return (
            <>
                <h1>Погода в городах</h1>
                <div>
                    <SearchBar type="text"
                               placeholder="Город..."
                               onSubmit={this.addCity}
                               btnText={'Добавить город'}
                    />
                    <br/>
                    <SearchBar type="text"
                               placeholder="Поиск города..."
                               searchItems={this.props.cityStorage
                                   ? this.props.cityStorage.map(item => ({name: item.name, code: item.code}))
                                   : []}
                               onSubmit={this.onClickSuggest.bind(this)}
                    />
                </div>
                <CityList cities={this.props.cityStorage || []} removeFunc={this.removeCity}/>
                <Alert stack={{limit: 3}}/>
            </>
        );
    }
}

export default withRouter(withCityFromCache(Home));
