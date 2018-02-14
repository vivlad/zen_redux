import React, { Component } from 'react';
import { connect } from 'react-redux';


import './App.css';
import Header from './components/Header';
import * as homeActions from './actions/homeActions';

class App extends Component {

  toggleButton = () => {
    this.props.toggleButton();
    console.log( 'It is async: (buttonIsPressed) = ' + this.props.buttonIsPressed );
  }

  render() {
    
    return (
      <div className="App">
        <Header />
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
});

const mapStateToProps = (state) => ({
  buttonIsPressed: state.homeReducer.buttonIsPressed,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
