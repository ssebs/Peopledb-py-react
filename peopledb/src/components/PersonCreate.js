import React, { Component } from "react";

export class PersonCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: ""
        };
    }

    handleChange = evt => {};

    handleSubmit = evt => {
        evt.preventDefault();
        if (!window.confirm("Are you sure you want to submit?")) {
            return;
        }
        console.log(this.state);
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
                        id='first'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                        autoComplete='new-password'
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
                        id='last'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                        autoComplete='new-password'
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
                        id='email'
                        onChange={this.handleChange}
                        style={{ marginBottom: "10px" }}
                    />

                    <br />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default PersonCreate;
