import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    CardBottom,
    CardBottomBtn,
    CardInfo, CardInfoRow,
    CardTitle,
    CardWrapper
} from "./styled";

export const City = props => {
    const { name, code, data } = props.cityInfo;
    return (
        <CardWrapper>
            <Link to={`/city/${code}`}>
                <CardTitle>{name}</CardTitle>
            </Link>

            <CardInfo>
                <CardInfoRow>
                    <span>температура, {data.temperature}°</span>
                </CardInfoRow>
                <CardInfoRow>
                    <span>ветер, {data.wind} м/с</span>
                </CardInfoRow>
                <CardInfoRow>
                    <span>влажность, {data.humidity}%</span>
                </CardInfoRow>
            </CardInfo>
            <CardBottom>
                <CardBottomBtn onClick={() => props.removeFunc(name)}>
                    Удалить город
                </CardBottomBtn>
            </CardBottom>
        </CardWrapper>
    );
};

City.propTypes = {
    removeFunc: PropTypes.func,
    cityInfo: PropTypes.object
};

export default City;
