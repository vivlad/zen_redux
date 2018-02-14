import * as appTypes from '../types/weatherTypes';

const initionalState = {
    isLoading: false,
    weatherData: {},
    lastUpdate: '',
}

export const weatherReducer = ( state = initionalState, action ) => {
    switch (action.type) {
        case appTypes.LOAD_WEATHER: 
            return {
                ...state,
                weatherData: action.data,
                lastUpdate: Date.now(),
            }
        case appTypes.LOAD_WEATHER_STARTED: 
            return {
                ...state,
                isLoading: true,
            }
        case appTypes.LOAD_FINISHED: 
            return {
                ...state,
                isLoading: false,
            }
        default: return state;
    }
}