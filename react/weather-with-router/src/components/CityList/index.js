import React from 'react';

import City from "../City";

import { CityListWrapper } from "./styled";

export default ({cities, removeFunc}) => (
        <CityListWrapper>
            {cities.map((city) => <City key={city.name} cityInfo={city} removeFunc={removeFunc} />)}
        </CityListWrapper>
);

