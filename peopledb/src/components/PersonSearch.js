import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Display Search Results in unordered list
export function SearchResults(props) {
    // Check if there are any search results
    if (props.ppl.length === 0) {
        return <div />;
    }

    let pplElements = props.ppl.map(person => {
        return (
            <tr key={person.id}>
                <td>
                    <Link to={"/detail/" + person.id} style={{
                        backgroundColor: "#ccc",
                        padding: "5px",
                        marginBottom: "5px",
                        color: "#000",
                        textDecoration: "none"
                    }}>
                    {person.id}
                    </Link>
                </td>
                <td> {person.first}</td>
                <td> {person.last}</td>
                <td>{person.email}</td>
            </tr>
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr >
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>{pplElements}</tbody>
            </table>
        </div>
    );
}

// Search People component
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
                // console.log(resp.data);
                this.setState({
                    searchResults: [...resp.data]
                });
            })
            .catch(e => console.log(e));
    };

    handleChange = evt => {
        let qry = evt.target.value;
        if (qry.replace(/^\s+|\s+$/g, "").length === 0) {
            this.setState({
                searchResults: []
            });
            return;
        }

        qry = qry.replace("*", "%");

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
                <h3>Search for People below</h3>
                <form onSubmit={this.handleSubmit}>
                    <label
                        htmlFor='qry'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Search:{" "}
                    </label>
                    <input
                        type='text'
                        id='qry'
                        onChange={this.handleChange}
                        autoComplete='off'
                    />{" "}
                    <button type='submit'>Submit</button>
                </form>
                <SearchResults ppl={this.state.searchResults} />
            </div>
        );
    }
}
export default PersonSearch;
