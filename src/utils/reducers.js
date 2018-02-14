import { combineReducers } from 'redux';
import { homeReducer } from '../reducers/';
import { weatherReducer } from '../reducers/';

const reducers = combineReducers({
    homeReducer: homeReducer,
    weatherReducer: weatherReducer,
});

export default reducers;