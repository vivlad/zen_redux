import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as weatherActions from '../../actions/weatherActions';
import Header from '../../components/Header';

class weatherDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIsFresh: true, //fresh data by default
        };
    }

    getWeather = () => {
        const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
        const cityID = '687700'; //ZP
        const query = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${apiKey}&units=metric`;
        const params = {
          method: 'GET',
        };
        this.props.loadingStarted();
        // set timeout for load animation
        setTimeout( () => {
            fetch( query, params )
            .then( data => data.json() )
            .then( data => {
                this.props.loadWeather(data);
                this.props.loadingFinished();
                this.setState({
                    dataIsFresh: true, // data was updated right now
                });
            })
            .catch( err => {
                console.log(err);
                this.props.loadingFinished();
            });
        }, 2000 );
      }
    
      componentDidMount() {
        const weatherData = this.props.weatherData;
        if( Object.keys(weatherData).length === 0 ) {
            this.getWeather();
        } else {
            this.setState({
                dataIsFresh: false, // this data is from store.
            });
        }
      }

    render(){
        const { isLoading, weatherData, lastUpdate } = this.props;
        
        return(
            <div>
                <Header/>
                {
                    isLoading &&
                    <div>Loading...</div>
                }
                { Object.keys(weatherData).length > 0 ?
                (
                    <div>
                        { !this.state.dataIsFresh &&
                            <div>
                                <p>This data was updated { (Date.now() - lastUpdate) / 1000 } seconds ago, so you can update it now</p>
                                <button onClick={ () => this.getWeather() }>Get fresh data</button>
                            </div>
                        }
                        <p>City: { weatherData.city.name }</p>
                        <ul>
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
    loadWeather: payload => dispatch(weatherActions.loadWeather(payload)),
    loadingStarted: () => dispatch(weatherActions.loadingStarted()),
    loadingFinished: () => dispatch(weatherActions.loadingFinished()),
  });
  
  const mapStateToProps = (state) => ({
    isLoading: state.weatherReducer.isLoading,
    weatherData: state.weatherReducer.weatherData,
    lastUpdate: state.weatherReducer.lastUpdate,
  });

export default connect(mapStateToProps, mapDispatchToProps)(weatherDetail);