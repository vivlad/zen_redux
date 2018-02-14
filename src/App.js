import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import * as homeActions from './actions/homeActions';

class App extends Component {

  toggleButton = () => {
    this.props.toggleButton();
    console.log( 'It is async: (buttonIsPressed) = ' + this.props.buttonIsPressed );
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={()=>this.toggleButton()}>Click me</button>
        </p>
        <div className={ `indicator ${this.props.buttonIsPressed ? 'pressed' : ''}` }></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleButton: () => dispatch(homeActions.toggleButton()),
  //requestSuccess: payload => dispatch(requestSuccess(payload)),
  //requestError: payload => dispatch(requestError(payload)),
});

const mapStateToProps = (state) => ({
  buttonIsPressed: state.homeReducer.buttonIsPressed,
  //isFetching: state.app.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
