import * as appTypes from '../types/weatherTypes';

export const loadWeather = (payload) => ({
    type: appTypes.LOAD_WEATHER,
    data: payload,
});

export const loadingStarted = () => ({
    type: appTypes.LOAD_WEATHER_STARTED,
});

export const loadingFinished = () => ({
    type: appTypes.LOAD_FINISHED,
});