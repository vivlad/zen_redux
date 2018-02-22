import * as appTypes from '../types/weatherTypes';
import store from '../utils/store';

export const loadWeather = () => dispatch => {
  const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
  const cityID = store.getState().weatherReducer.cityID;
  const query = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${apiKey}&units=metric`;
  const params = {
    method: 'GET',
  };
  dispatch(loadingStarted());
  fetch( query, params )
  .then( data => data.json() )
  .then( data => {
      dispatch({
        type: appTypes.LOAD_WEATHER_PROCESS,
        data,
      });
      dispatch(loadingFinished());
  })
  .catch( err => {
      console.log(err);     
  });
  
}

export const loadingStarted = () => ({
    type: appTypes.LOAD_WEATHER_STARTED,
});

export const loadingFinished = () => ({
    type: appTypes.LOAD_FINISHED,
});

export const loadCity = (s) => dispatch => {
  const apiKey = 'b6907d289e10d714a6e88b30761fae22'; // Key from offsite for search))
  const query = `http://openweathermap.org/data/2.5/find?type=like&sort=population&appid=${apiKey}&q=${s}`;
  const params = {
    method: 'GET',
  };
  dispatch(searchStarted());
  fetch( query, params )
  .then( data => data.json() )
  .then( data => {
      dispatch({
        type: appTypes.CITY_SEARCH_COMPLETED,
        data,
      });
  })
  .catch( err => {
      console.log(err);     
  });
}

export const searchStarted = () => ({
  type: appTypes.CITY_SEARCH_STARTED,
});

export const setCityId = ( id ) => dispatch => {
  dispatch({
    type: appTypes.SET_CITY_ID,
    id,
  });
};