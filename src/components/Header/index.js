import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
        return(
            <header className="App-header">
                <h1 className="App-title">Welcome to React</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/weather_detail">Weather</Link>
                </nav>
            </header>
        );
    }
}

export default Header;