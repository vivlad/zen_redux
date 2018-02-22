import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as weatherActions from '../../actions/weatherActions';
import Header from '../../components/Header';
import CitySelector from '../../components/CitySelector';
import './index.css';

class weatherDetail extends Component {

    componentDidMount() {
      if( this.props.needsToLoadData ) {
        this.props.loadWeather();
      }
    }

    componentWillReceiveProps(nextProps) {
      if( nextProps.needsToLoadData ) {
        this.props.loadWeather();
      }
    }

    render(){
        const { isLoading, weatherData } = this.props;
       
        return(
            <div>
                <Header/>
                {
                    isLoading &&
                    <div>Loading...</div>
                }
                { Object.keys(weatherData).length > 0 && !isLoading ?
                (
                    <div>
                        <p>Weather data. Last updeted { (Date.now() - this.props.lastUpdate)/1000 } seconds ago</p>
                        <p>City: { weatherData.city.name }</p>
                        <CitySelector />
                        <ul className="weather-list">
                        {
                            weatherData.list.map((item, idx) => (
                                <li key={idx}>
                                    <span>Time: {item.dt_txt}</span>
                                    <span>Temp: {item.main.temp}</span>
                                    <img src={`//openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon"/>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                )                    
                    :
                    null
                }
                

            </div>
        );
    }

}

  const mapDispatchToProps = dispatch => ({
    loadWeather: () => dispatch(weatherActions.loadWeather()),
  });
  
  const mapStateToProps = (state) => ({
    isLoading: state.weatherReducer.isLoading,
    weatherData: state.weatherReducer.weatherData,
    lastUpdate: state.weatherReducer.lastUpdate,
    needsToLoadData: state.weatherReducer.needsToLoadData,
  });

export default connect(mapStateToProps, mapDispatchToProps)(weatherDetail);