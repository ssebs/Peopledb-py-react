import React, {Component} from 'react';

class PersonDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
          person: {}  
        };
        console.log(this.props.match.params.id);
    }

    getSamplePerson = (id) => {
        if (id == -1){
            return {
                id: -1,
                firstName: 'SampleFirst',
                lastName: 'SampleLast',
                email: 'Sample@Email.com'
            }
        } else {
            return {status: "Error"}
        }
        
    }


    componentDidMount() {
        this.setState({
            person: this.getSamplePerson(this.props.match.params.id)
        })
    }

    handleInputChange(event) {
        let f = this.state.person.firstName;
        let l = this.state.person.lastName;
        let e = this.state.person.email;
        switch (event.target.name) {
            case 'first':
                f = event.target.value;
                break;
            case 'last':
                l = event.target.value;
                break
            case 'email':
                e = event.target.value;
                break
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
        console.log(this.state.person.firstName);
    }

    render(){
        return (
            <div>
                <h2>{this.state.person.firstName}'s Info:</h2>

                <form onSubmit={this.updatePerson.bind(this)}>
                    <label>First: <input type="text" name="first" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.firstName} /> </label><br></br>
                    <label>Last: <input type="text" name="last" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.lastName} /> </label><br></br>
                    <label>Email: <input type="text" name="email" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.email} /> </label><br></br>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default PersonDetail;