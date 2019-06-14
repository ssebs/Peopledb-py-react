import React, { Component } from "react";
import axios from "axios";
import {
    Container,
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Button
} from "react-bootstrap";

export class PersonCreate extends Component {
    constructor(props) {
        super(props);
        // this.props.baseRESTUrl should be the REST url to access

        this.state = {
            first_name: "",
            last_name: "",
            email: ""
        };
        // console.log(this.props);
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        if (this.state.email.indexOf("@") === -1) {
            window.alert("Please enter a valid email");
            return;
        }

        if (!window.confirm("Are you sure you want to submit?")) {
            return;
        }

        this.createPerson();
    };

    createPerson = () => {
        const url = this.props.baseRESTUrl + "/people/";

        const { first_name, last_name, email } = this.state;

        const personToSend = {
            first_name,
            last_name,
            email
        };

        axios
            .post(url, personToSend)
            .then(r => {
                console.log(r);
                const newID = r.data["Data"].id;
                console.log(newID);
                window.location = "/detail/" + newID;
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <Container
                style={{
                    textAlign: "center"
                }}
            >
                <h1>Create a new Person</h1>
                <p>
                    Just fill out this form and you'll be on your way in
                    creating a new person in the DB.
                </p>
                <hr />
                <div
                    style={{
                        maxWidth: "50%",
                        margin: "auto",
                        textAlign: "left"
                    }}
                >
                    <Form
                        onSubmit={this.handleSubmit}
                        autoComplete="new-password"
                    >
                        <FormGroup>
                            <FormLabel>First Name:</FormLabel>
                            <FormControl
                                type="text"
                                name="first_name"
                                onChange={this.handleChange}
                                autoComplete="new-password"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Last Name:</FormLabel>
                            <FormControl
                                type="text"
                                name="last_name"
                                onChange={this.handleChange}
                                autoComplete="new-password"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Email:</FormLabel>
                            <FormControl
                                type="text"
                                name="email"
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default PersonCreate;
