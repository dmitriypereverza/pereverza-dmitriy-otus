const weatherTypes = {
    'sunny': 'https://avatars.mds.yandex.net/get-pdb/1515288/1d7d2484-e4f0-4703-80a5-fab0388b55ce/s1200',
    'snow': 'https://avatars.mds.yandex.net/get-pdb/33827/f66f18f5-644c-4746-b96b-d2dc997b421e/optimize',
    'rain': 'https://img.tsn.ua/cached/1533908229/tsn-8c5f6b23d1211bb14030cc3abd4583f7/thumbs/1340x530/f1/f5/b1bda47565097a258a500370b8f3f5f1.jpeg',
    'clouds': 'http://fakti.ks.ua/uploads/posts/2016-07/1469182321_maxresdefault.jpg'
};

export const weather = {
    state: {
        backgroundUrl: weatherTypes.snow,
    },
    reducers: {
        // handle state changes with pure functions
        changeWeather(state, payload) {
            console.log(payload);
            const { temperature, wind, humidity } = payload;
            if (humidity > 90) {
                return {
                    backgroundUrl: weatherTypes.rain
                };
            }

            if (humidity > 70 && wind > 5) {
                return {
                    backgroundUrl: weatherTypes.clouds
                };
            }

            if (temperature < 2 && humidity < 70) {
                return {
                    backgroundUrl: weatherTypes.snow
                };
            }

            return {
                backgroundUrl: weatherTypes.sunny
            };
        }
    }
};
