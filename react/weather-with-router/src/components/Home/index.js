import React, {Component} from 'react';
import transtit from 'cyrillic-to-translit-js';

import Alert from "react-s-alert";

import SearchBar from "../primitive/input";
import CityList from "../CityList";

import { random } from "../../utils/utils";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const testData = [
    {name: "Москва", code: 'Moskva', data: {temperature: 10, wind: 1 ,humidity: 81}},
    {name: "Ростов-на-Дону", code: 'Rostov-na-Donu', data: {temperature: 12, wind: 2 ,humidity: 82}},
    {name: "Омск", code: 'Omsk', data: {temperature: 13, wind: 3 ,humidity: 83}},
];

const alertSettings = {position: 'top', effect: 'slide',  timeout: 1000};
function customAlert(text, isError = false) {
    isError ? Alert.error(text, alertSettings) : Alert.success(text, alertSettings);
}

export default class Home extends Component{
    state = {
        favoriteCities : testData,
        newCityName: ""
    };

    componentWillMount() {
        let cacheCity = localStorage.getItem('favoriteCity');
        if (cacheCity) {
            this.setState({'favoriteCities': JSON.parse(cacheCity)});
            return;
        }
        localStorage.setItem('favoriteCity', JSON.stringify(this.state.favoriteCities));
    }

    componentDidUpdate() {
        localStorage.setItem('favoriteCity', JSON.stringify(this.state.favoriteCities));
    }

    addCity = (value) => {
        if (!value) {
            customAlert('Введите имя города', true);
            return;
        }

        const existCity = this.state.favoriteCities.find((city) => {
            return city.name === value;
        });
        if (existCity) {
            customAlert(`Город ${value} в списке уже есть`, true);
            return;
        }

        const city = {
            name: value,
            code: transtit().transform(value),
            data: this.generateWeatherProperty()
        };
        this.setState({favoriteCities : this.state.favoriteCities.concat([city])});

        customAlert(`Город ${value} добавлен в список`);
    };

    removeCity = (cityName) => {
        const newCities = this.state.favoriteCities.slice();
        this.state.favoriteCities.forEach((item, index) => {
            if (item.name === cityName) {
                newCities.splice(index, 1);
                this.setState({favoriteCities : newCities});
                customAlert(`Город ${cityName} удален из списка`);
                return;
            }
        });
    };

    generateWeatherProperty() {
        return {
            temperature: random(1, 25),
            wind: random(1, 10),
            humidity: random(50, 99)
        }
    }

    render() {
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
                               searchItems={this.state.favoriteCities.map(item => ({name: item.name, code: item.code}))}
                               onSubmit={console.log}
                    />
                </div>
                <CityList cities={this.state.favoriteCities} removeFunc={this.removeCity}/>
                <Alert stack={{limit: 3}}/>
            </>
        );
    }
};


