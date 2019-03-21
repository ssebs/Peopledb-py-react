import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header material-shadow">
                <ul>
                    <li className="title">
                        <Link to="/">{this.props.title}</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/create">Create a new Person</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;