import React, { Component } from "react";
import axios from "axios";
import {
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
            first: "",
            last: "",
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
        const url = this.props.baseRESTUrl + "/people/create";

        const { first, last, email } = this.state;

        const personToSend = {
            first,
            last,
            email
        };

        axios
            .post(url, personToSend)
            .then(r => {
                // console.log(r)
                const newID = r.data["id"];
                window.location = "/detail/" + newID;
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <div style={{ maxWidth: "50%", margin: "auto" }}>
                <h1>Create a new Person</h1>
                <p>
                    Just fill out this form and you'll be on your way in
                    creating a new person in the DB.
                </p>
                <hr />

                <Form onSubmit={this.handleSubmit} autoComplete="new-password">
                    <FormGroup>
                        <FormLabel>First Name:</FormLabel>
                        <FormControl
                            type="text"
                            name="first"
                            onChange={this.handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Last Name:</FormLabel>
                        <FormControl
                            type="text"
                            name="last"
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
        );
    }
}

export default PersonCreate;
