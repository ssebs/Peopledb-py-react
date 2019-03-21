import React, { Component } from "react";
import axios from "axios";

class PersonDetail extends Component {
    constructor(props) {
        super(props);
        // this.props.baseRESTUrl should be the REST url to access

        this.state = {
            person: {}
        };
        // console.log(this.props.match.params.id);
    }

    getSamplePerson = id => {
        if (+id === -1) {
            return {
                id: -1,
                firstName: "SampleFirst",
                lastName: "SampleLast",
                email: "Sample@Email.com"
            };
        } else {
            return { status: "Error" };
        }
    };

    getRESTPerson = id => {
        // GET a person based on id
        const url = this.props.baseRESTUrl + "/people/" + id;
        axios
            .get(url)
            .then(resp => {
                const { first, last, email } = resp.data[0];

                this.setState({
                    person: {
                        id,
                        firstName: first,
                        lastName: last,
                        email
                    }
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    updateRESTPerson = () => {
        // PATCH a person
        const url = this.props.baseRESTUrl + "/people/update";

        const { id, firstName, lastName, email } = this.state.person;
        const personToSend = {
            id: +id,
            first: firstName,
            last: lastName,
            email: email
        };
        // console.log(this.state.person);
        // console.log(personToSend);

        axios.patch(url, personToSend, {}).then(
            response => {
                console.log(response.data);
            },
            function(error) {
                console.log(error.message); //=> String
            }
        );
    };

    componentDidMount() {
        this.getRESTPerson(this.props.match.params.id);
    }

    handleInputChange(event) {
        let f = this.state.person.firstName;
        let l = this.state.person.lastName;
        let e = this.state.person.email;

        switch (event.target.name) {
            case "first":
                f = event.target.value;
                break;
            case "last":
                l = event.target.value;
                break;
            case "email":
                e = event.target.value;
                break;
            default:
                break;
        }

        this.setState({
            person: {
                id: this.state.person.id,
                firstName: f,
                lastName: l,
                email: e
            }
        });
    }

    updatePerson(event) {
        event.preventDefault();
        if (window.confirm("Are you sure you want to submit?")) {
            // console.log(this.state.person);
            this.setState({
                showUpdated: true
            });
            this.updateRESTPerson();
        }
    }

    render() {
        let updatedHtml;
        if (this.state.showUpdated) {
            updatedHtml = <p>Updated!</p>;
        }

        return (
            <div>
                <h2>{this.state.person.firstName}'s Info:</h2>
                <h5>
                    Your updates won't get submitted until you hit "Submit"
                    below.
                </h5>
                <hr />
                <form onSubmit={this.updatePerson.bind(this)}>
                    <label
                        htmlFor='first'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        First:{" "}
                    </label>
                    <input
                        type='text'
                        name='first'
                        onChange={this.handleInputChange.bind(this)}
                        style={{ marginBottom: "10px" }}
                        defaultValue={this.state.person.firstName}
                    />{" "}
                    <br />
                    <label
                        htmlFor='last'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Last:{" "}
                        </label>
                        <input
                            type='text'
                            name='last'
                            onChange={this.handleInputChange.bind(this)}
                            style={{ marginBottom: "10px" }}
                            defaultValue={this.state.person.lastName}
                        />{" "}
                    <br />
                    <label
                        htmlFor='email'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Email:{" "}
                        </label>
                        <input
                            type='text'
                            name='email'
                            onChange={this.handleInputChange.bind(this)}
                            style={{ marginBottom: "10px" }}
                            defaultValue={this.state.person.email}
                        />{" "}
                    
                    <br />
                    <button>Submit</button>
                    <blockquote>
                        Todo: Add delete button
                    </blockquote>
                </form>
                <div>{updatedHtml}</div>
            </div>
        );
    }
}

export default PersonDetail;
