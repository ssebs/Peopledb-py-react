import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Idea for structure:
 * - Search box
 *  - GET search
 *  - list results with clickable link
 */

export function SearchResults(props) {
    // Check if there are any search results
    if (props.ppl.length === 0) {
        return <div />;
    }

    let pplElements = props.ppl.map(person => {
        return (
            <li key={person.id}>
                <Link to={"/detail/" + person.id}>{person.id}</Link>{" "}
                {person.first} {person.last} {person.email}
            </li>
        );
    });

    return (
        <div>
            <ul>{pplElements}</ul>
        </div>
    );
}

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
                    searchResults: [...resp.data]
                });
            })
            .catch(e => console.log(e));
    };

    handleChange = evt => {
        let qry = evt.target.value;
        if (qry.replace(/^\s+|\s+$/g, '').length === 0) {
            this.setState({
                searchResults: []
            });
            return;
        }

        qry = qry.replace("*", '%');
        
        this.setState({
            searchQuery: qry
        });
        
        setTimeout(() => {
            this.getRESTPeople();
        }, 50);
        
    };

    handleSubmit = evt => {
        evt.preventDefault();
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
                    <label
                        htmlFor='qry'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Search:{" "}
                    </label>
                    <input type='text' id='qry' onChange={this.handleChange} autoComplete="off" />{" "}
                    <button type='submit'>Submit</button>
                </form>
                <SearchResults ppl={this.state.searchResults} />
            </div>
        );
    }
}
export default PersonSearch;
