import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Idea for structure:
 * - Search box
 *  - GET search
 *  - list results with clickable link
 */

class PersonSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            searchResults: []
        };
    }

    getRESTPeople = () => {
        const url = "http://localhost:5000/people/" + this.state.searchQuery;
        axios
            .get(url)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    searchResults: { ...resp.data }
                });
            })
            .catch(e => console.log(e));
    };

    handleChange = evt => {
        this.setState({
            searchQuery: evt.target.value
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        console.log(this.state.searchQuery);
        this.getRESTPeople();
    };

    render() {
        return (
            <div>
                <h3>Person Search</h3>
                <blockquote>
                    Todo: Make this a live search style form
                </blockquote>
                <p>
                    Sample person 2: <Link to='/detail/2'>Here</Link>
                </p>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label for='qry' style={{display: "block", fontWeight: "bold"}}>Search: </label>
                    <input
                        type='text'
                        id='qry'
                        onChange={this.handleChange}
                    />{" "}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}
export default PersonSearch;
