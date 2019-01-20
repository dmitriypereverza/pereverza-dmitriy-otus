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
                        <span>температура, °</span>
                        {this.props.cityInfo.data.temperature}
                    </div>
                    <div className="card-info-row">
                        <span>ветер, м/с</span>
                        {this.props.cityInfo.data.wind}
                    </div>
                    <div className="card-info-row">
                        <span>влажность, %</span>
                        {this.props.cityInfo.data.humidity}
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
