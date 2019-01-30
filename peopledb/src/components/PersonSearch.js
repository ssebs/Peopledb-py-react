import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class PersonSearch extends Component {

    render() {
        return (
            <div>
                <h3>Person Search</h3>

                <p>Sample person: <Link to='/detail/-1'>Here</Link></p>
            </div>
        );
    }

}
export default PersonSearch;