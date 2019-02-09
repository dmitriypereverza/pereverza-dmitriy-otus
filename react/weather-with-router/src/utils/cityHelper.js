import transtit from "cyrillic-to-translit-js";
import  { random }  from "./utils";

export function generateCity(value) {
    const generateWeatherProperty = () => {
        return {
            temperature: random(1, 25),
            wind: random(1, 10),
            humidity: random(50, 99)
        }
    };

    return {
        name: value,
        date: new Date().toString(),
        code: transtit().transform(value),
        data: generateWeatherProperty(),
        forecast: generateForecast(5)
    };
}

export function generateForecast (countDays) {
    const forecast = [];
    for (let i = 1; i <= countDays; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        forecast.push({
            date: date,
            temperature: random(1, 25),
            wind: random(1, 10),
            humidity: random(50, 99)
        });
    }
    return forecast;
}

export function updateWeather(city) {
    const cityDate = new Date(Date.parse(city.date));
    if (cityDate.toDateString() === new Date().toDateString()) {
        return city
    }
    return generateCity(city.name);
}
