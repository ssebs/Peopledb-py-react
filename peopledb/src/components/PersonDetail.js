import React, { Component } from "react";
import axios from "axios";

import {
    Container,
    Form,
    FormLabel,
    FormControl,
    Button,
    FormGroup,
    Alert
} from "react-bootstrap";

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
                const { first_name, last_name, email } = resp.data;

                this.setState({
                    person: {
                        id,
                        firstName: first_name,
                        lastName: last_name,
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
        const url = this.props.baseRESTUrl + `/people/${this.state.person.id}`;

        const { id, firstName, lastName, email } = this.state.person;
        const personToSend = {
            id: +id,
            first_name: firstName,
            last_name: lastName,
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
        const url = this.props.baseRESTUrl + `/people/${this.state.person.id}`;
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
            case "first_name":
                f = event.target.value;
                break;
            case "last_name":
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

        // console.log(this.state.person);
        this.setState({
            showUpdated: true
        });
        this.updateRESTPerson();
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

        // console.log("Deleting " + this.state.person.firstName);
        this.deleteRESTPerson();
    };

    render() {
        return (
            <Container
                style={{
                    textAlign: "center"
                }}
            >
                <div>
                    <h2
                        style={{
                            display: "inline-block",
                            marginRight: "2rem"
                        }}
                    >
                        {this.state.person.firstName}
                    </h2>
                    <span>ID: {this.state.person.id}</span>
                </div>
                <p>
                    Your updates won't get submitted until you hit "Submit"
                    below.
                </p>
                {this.state.showUpdated ? (
                    <Alert variant="success">Updated!</Alert>
                ) : (
                    <div />
                )}
                <hr />
                <div
                    style={{
                        maxWidth: "50%",
                        margin: "auto",
                        textAlign: "left"
                    }}
                >
                    <Form onSubmit={this.updatePerson}>
                        <FormGroup>
                            <FormLabel>First: </FormLabel>
                            <FormControl
                                type="text"
                                name="first_name"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.person.firstName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Last: </FormLabel>
                            <FormControl
                                type="text"
                                name="last_name"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.person.lastName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Email: </FormLabel>
                            <FormControl
                                type="text"
                                name="email"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.person.email}
                            />
                        </FormGroup>
                        <Button type="submit">Submit Changes</Button>
                    </Form>
                    <hr style={{ margin: "10px 0px" }} />
                    <div>
                        <Form onSubmit={this.deletePerson}>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                type="submit"
                                className="delete-button"
                            >
                                Delete User
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        );
    }
}

export default PersonDetail;
