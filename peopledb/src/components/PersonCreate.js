import React, { Component } from "react";
import axios from "axios";

export class PersonCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            email: ""
        };
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
        const url = "http://localhost:5000/people/create";

        const { first, last, email } = this.state;

        const personToSend = {
            first,
            last,
            email
        };

        axios
            .post(url, personToSend)
            .then(r => {
                console.log(r)
                const newID = r.data['id']
                window.location = "/detail/" + newID;
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <div>
                <h1>Create a new Person</h1>
                <p>
                    Just fill out this form and you'll be on your way in
                    creating a new person in the DB.
                </p>

                <hr />

                <form onSubmit={this.handleSubmit} autoComplete='new-password'>
                    <label
                        htmlFor='first'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        First Name:
                    </label>
                    <input
                        type='text'
                        name='first'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                        autoComplete='new-password'
                        required
                    />
                    <br />

                    <label
                        htmlFor='last'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Last Name:
                    </label>
                    <input
                        type='text'
                        name='last'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                        autoComplete='new-password'
                        required
                    />
                    <br />

                    <label
                        htmlFor='email'
                        style={{ display: "block", fontWeight: "bold" }}
                    >
                        Email:
                    </label>
                    <input
                        type='text'
                        name='email'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                        required
                    />

                    <br />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default PersonCreate;
