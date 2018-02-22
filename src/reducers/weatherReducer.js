import * as appTypes from '../types/weatherTypes';

const initionalState = {
    isLoading: false,
    weatherData: {},
    lastUpdate: '',
    cityID: '687700', //ZP
    citySearchResults: null,
    needsToLoadData: true,
}

export const weatherReducer = ( state = initionalState, action ) => {
    switch (action.type) {
        case appTypes.LOAD_WEATHER_PROCESS: 
            return {
                ...state,
                weatherData: action.data,
                lastUpdate: Date.now(),
                needsToLoadData: false,
            }
        case appTypes.LOAD_WEATHER_STARTED: 
            return {
                ...state,
                isLoading: true,
                needsToLoadData: false,
            }
        case appTypes.LOAD_FINISHED: 
            return {
                ...state,
                isLoading: false,
            }
        case appTypes.CITY_SEARCH_COMPLETED:
            return {
              ...state,
              citySearchResults: action.data,
            }
        case appTypes.SET_CITY_ID:
            return {
              ...state,
              cityID: action.id,
              weatherData: {},
              needsToLoadData: true,
            }
        default: return state;
    }
}