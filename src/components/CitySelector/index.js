import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as weatherActions from '../../actions/weatherActions';

class CitySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showResults: false,
    }
  }

  formSubmitHandler = ( e ) => {
    e.preventDefault();
    this.props.loadCity( this.state.value );
    this.setState({ showResults: true }); // open results block after submit
  }

  inputHandler = (e) => {
    this.setState({
      value: e.target.value,
      showResults: false, //hide results while typing
     });
  }

  clickSearchResultHandler = (id) => {
    this.props.setCityId(id);
  }

  render(){
    let results = null;
    if( this.state.showResults ) {
      if( this.props.searchResults && Object.keys( this.props.searchResults ).length > 0 ) {
        if( parseInt(this.props.searchResults.count, 10) === 0 ) {
          results = <p>Nothing found </p>;
        } else {
          results = (
              <ul className="citySearcResults">
                {
                  this.props.searchResults.list.map( el => (
                    <li key={el.id} onClick={ () => this.clickSearchResultHandler(el.id) }>{el.name} ({el.sys.country})</li>
                  ))
                }
              </ul>
            )
        }
      }
    } 

    return(
      <div>
        <p>Also you can find another city: </p>
        <form onSubmit={this.formSubmitHandler}>
          <input type="text" value={this.state.value} onChange={this.inputHandler} />
          <button type="submit">Search</button>
        </form>
        {results}
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadCity: (s) => dispatch(weatherActions.loadCity(s)),
  setCityId: (id) => dispatch(weatherActions.setCityId(id)),
});

const mapStateToProps = (state) => ({
  searchResults: state.weatherReducer.citySearchResults,
});

export default connect(mapStateToProps, mapDispatchToProps)(CitySelector);