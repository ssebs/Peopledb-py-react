import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { Table, FormControl, Button, InputGroup } from "react-bootstrap";

// Display Search Results in table body
export function SearchResults(props) {
    // Check if there are any search results
    if (props.ppl.length === 0) {
        return <div />;
    }

    const pplElements = props.ppl.map(person => {
        return (
            <tr
                key={person.id}
                onClick={() => props.history.push(`/detail/${person.id}`)}
            >
                <td>{person.id}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.email}</td>
            </tr>
        );
    });

    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>{pplElements}</tbody>
        </Table>
    );
}

// Search People component
class PersonSearch extends Component {
    constructor(props) {
        super(props);
        // this.props.baseRESTUrl should be the REST url to access

        this.state = {
            searchQuery: "",
            searchResults: []
        };
    }

    getRESTPeople = () => {
        const url =
            this.props.baseRESTUrl + "/people/" + this.state.searchQuery;
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

    componentDidMount() {
        this.getRESTPeople();
    }

    handleChange = e => {
        let qry = e.target.value;
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

    handleSubmit = e => {
        e.preventDefault();
        this.getRESTPeople();
    };

    render() {
        return (
            <div>
                <h3>Search for People below</h3>
                <InputGroup>
                    <FormControl
                        type="text"
                        id="qry"
                        onChange={this.handleChange}
                        autoComplete="off"
                        autoFocus
                    />
                    <InputGroup.Append>
                        <Button type="button" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <br />
                <SearchResults
                    ppl={this.state.searchResults}
                    history={this.props.history}
                />
            </div>
        );
    }
}
export default withRouter(PersonSearch);
