import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    CardBottom,
    CardBottomBtn,
    CardInfo, CardInfoRow,
    CardTitle,
    CardWrapper
} from "./styled";

export default class City extends Component {
    removeCity = () => {
        this.props.removeFunc(this.props.cityInfo.name);
    };

    render() {
        return (
            <CardWrapper>
                <CardTitle>{this.props.cityInfo.name}</CardTitle>

                <CardInfo>
                    <CardInfoRow>
                        <span>температура, {this.props.cityInfo.data.temperature}°</span>
                    </CardInfoRow>
                    <CardInfoRow>
                        <span>ветер, {this.props.cityInfo.data.wind} м/с</span>
                    </CardInfoRow>
                    <CardInfoRow>
                        <span>влажность, {this.props.cityInfo.data.humidity}%</span>
                    </CardInfoRow>
                </CardInfo>
                <CardBottom>
                    <CardBottomBtn onClick={this.removeCity}>Удалить город</CardBottomBtn>
                </CardBottom>
            </CardWrapper>
        );
    }
}

City.propTypes = {
    removeFunc: PropTypes.func,
    cityInfo: PropTypes.object
};
