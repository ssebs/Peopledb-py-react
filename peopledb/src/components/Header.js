import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <hr/>
                
                <ul>
                    <li style={headerStyle}>
                        <Link to="/">{this.props.title}</Link>
                    </li>
                    <li style={headerStyle}>
                        <Link to="/about">About</Link>
                    </li>
                    <li style={headerStyle}>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <hr/>
            </div>
        );
    }
}

const headerStyle = {
    display: 'inline',
    padding: '0px 5px'
};

export default Header;