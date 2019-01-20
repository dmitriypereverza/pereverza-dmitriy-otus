import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './city.css';

export default class City extends Component {
    removeCity = () => {
        this.props.removeFunc(this.props.cityInfo.name);
    };

    render() {
        return (
            <div className={'card'}>
                <div className={'card-title'}>{this.props.cityInfo.name}</div>

                <div className="card-info">
                    <div className="card-info-row">
                        <span>температура, {this.props.cityInfo.data.temperature}°</span>
                    </div>
                    <div className="card-info-row">
                        <span>ветер, {this.props.cityInfo.data.wind} м/с</span>
                    </div>
                    <div className="card-info-row">
                        <span>влажность, {this.props.cityInfo.data.humidity}%</span>
                    </div>
                </div>
                <div className="card-bottom">
                    <button onClick={this.removeCity}>Удалить город</button>
                </div>
            </div>
        );
    }
}

City.propTypes = {
    removeFunc: PropTypes.func,
    cityInfo: PropTypes.object
};
