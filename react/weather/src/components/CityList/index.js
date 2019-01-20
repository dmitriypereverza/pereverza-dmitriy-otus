import React from 'react';

import City from "../City";
import "./cityList.css";

export default function render({cities, removeFunc}) {
    return (
        <div className={'city-list'}>
            {cities.map((city) => <City key={city.name} cityInfo={city} removeFunc={removeFunc} />)}
        </div>
    );
}
