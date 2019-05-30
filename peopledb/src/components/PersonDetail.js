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

    getRESTPerson = id => {
        // GET a person based on id
        const url = this.props.baseRESTUrl + "/people/" + id;
        axios
            .get(url)
            .then(resp => {
                const { first, last, email } = resp.data;

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

        axios
            .patch(url, personToSend)
            .then(response => {
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error.message); //=> String
            });
    };

    deleteRESTPerson = () => {
        const url = this.props.baseRESTUrl + "/people/delete";
        const idObj = {
            id: this.state.person.id
        };

        axios
            .delete(url, { data: idObj })
            .then(response => {
                console.log(response.data);
                window.location = "/";
            })
            .catch(error => console.log(error.message));
    };

    componentDidMount() {
        this.getRESTPerson(this.props.match.params.id);
    }

    handleInputChange = event => {
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
    };

    updatePerson = event => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to submit?")) {
            // console.log(this.state.person);
            this.setState({
                showUpdated: true
            });
            this.updateRESTPerson();
        }
    };

    deletePerson = event => {
        event.preventDefault();

        if (
            !window.confirm(
                "Are you sure you want to delete " +
                    this.state.person.firstName +
                    "?"
            )
        )
            return;
        if (!window.confirm("Are you REALLY sure?")) return;

        // console.log("Deleting " + this.state.person.firstName);
        this.deleteRESTPerson();
    };

    render() {
        let updatedHtml;
        if (this.state.showUpdated) {
            updatedHtml = <p>Updated!</p>;
        }

        return (
            <div>
                <h2>
                    ID: {this.state.person.id} ({this.state.person.firstName}'s)
                    Info:
                </h2>

                <h5>
                    Your updates won't get submitted until you hit "Submit"
                    below.
                </h5>
                <hr />
                <div>
                    <form onSubmit={this.updatePerson}>
                        <label htmlFor="first">First: </label>
                        <input
                            type="text"
                            name="first"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.person.firstName}
                        />{" "}
                        <br />
                        <label htmlFor="last">Last: </label>
                        <input
                            type="text"
                            name="last"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.person.lastName}
                        />{" "}
                        <br />
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.person.email}
                        />{" "}
                        <br />
                        <button type="submit">Submit Changes</button>
                    </form>
                </div>
                <hr style={{ margin: "10px 0px" }} />
                <div>
                    <form onSubmit={this.deletePerson}>
                        <button type="submit" className="delete-button">
                            Delete User
                        </button>
                    </form>
                </div>
                <div style={{ clear: "both" }}>{updatedHtml}</div>
            </div>
        );
    }
}

export default PersonDetail;
