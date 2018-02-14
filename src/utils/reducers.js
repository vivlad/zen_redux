import { combineReducers } from 'redux';
import { homeReducer } from '../reducers/';

const reducers = combineReducers({
    homeReducer: homeReducer,
});

export default reducers;