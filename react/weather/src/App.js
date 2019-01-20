import React, { Component } from 'react';
import Alert from 'react-s-alert';

import CityList from "./components/CityList";
import { random } from "./utils/utils";
import Input from "./components/primitive/input";

import './App.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const testData = [
    {name: "Москва", data: {temperature: 10, wind: 1 ,humidity: 81}},
    {name: "Ростов-на-Дону", data: {temperature: 12, wind: 2 ,humidity: 82}},
    {name: "Омск", data: {temperature: 13, wind: 3 ,humidity: 83}},
];

const alertSettings = {position: 'top', effect: 'slide',  timeout: 1000};
function alert(text, isError = false) {
    isError ? Alert.error(text, alertSettings) : Alert.success(text, alertSettings);
}

class App extends Component {
    state = {
        cities : testData,
        newCityName: ""
    };

  handleCityName = (event) => {
        this.setState({ newCityName: event.target.value });
  };

  addCity = () => {
    if (!this.state.newCityName) {
        alert('Введите имя города', true);
        return;
    }

    const existCity = this.state.cities.find((city) => {
        return city.name === this.state.newCityName;
    });
    if (existCity) {
        alert("Город " + this.state.newCityName + " в списке уже есть", true);
        return;
    }

    const city = {
        name: this.state.newCityName,
        data: this.generateWeatherProperty
    };
    this.setState({cities : this.state.cities.concat([city])});

    alert("Город " + this.state.newCityName + " добавлен в список");
  };

  removeCity = (cityName) => {
      const newCities = this.state.cities.slice();
      this.state.cities.forEach((item, index) => {
          if (item.name === cityName) {
              newCities.splice(index, 1);
              this.setState({cities : newCities});
              alert("Город " + cityName + " удален из списка");
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
       <div className="App">
            <h1>Погода в городах</h1>
            <div>
                <Input type="text"
                      placeholder="Город..."
                      value={this.state.newCityName}
                      onChange={this.handleCityName}
                      onSubmit={this.addCity}
                       btnText={'Добавить город'}
                />
            </div>
                <CityList cities={this.state.cities} removeFunc={this.removeCity} />
            <Alert stack={{limit: 3}} />
       </div>
    );
  }
}

export default App;
