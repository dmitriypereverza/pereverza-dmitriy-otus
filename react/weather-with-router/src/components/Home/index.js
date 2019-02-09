import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Alert from "react-s-alert";

import SearchBar from "../primitive/input";
import CityList from "../CityList";

import {generateCity} from "../../utils/cityHelper";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const testData = ["Москва", "Ростов-на-Дону", "Омск"];

const alertSettings = {position: 'top', effect: 'slide',  timeout: 1000};
function customAlert(text, isError = false) {
    isError ? Alert.error(text, alertSettings) : Alert.success(text, alertSettings);
}

class Home extends Component{
    state = {
        favoriteCities : testData.map(generateCity),
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

        this.setState({favoriteCities : [ ...this.state.favoriteCities, generateCity(value)]});
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

    onClickSuggest(city) {
        this.props.history.push(`/city/${city.code}`);
    }

    render() {
        console.log(this.state.favoriteCities);
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
                               onSubmit={this.onClickSuggest.bind(this)}
                    />
                </div>
                <CityList cities={this.state.favoriteCities} removeFunc={this.removeCity}/>
                <Alert stack={{limit: 3}}/>
            </>
        );
    }
}

export default withRouter(Home);
