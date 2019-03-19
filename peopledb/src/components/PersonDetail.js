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


    getRESTPerson = (id) => {
        // GET a person based on id
        fetch("http://localhost:5000/people/" + id )
        .then((resp) => resp.json())
        .then((data)=>{
            // console.log(data);
            this.setState( {
                person: {
                    id: this.props.match.params.id,
                    firstName: data[0].first,
                    lastName: data[0].last,
                    email:  data[0].email
                }
            });
        })
        .catch((e) => console.log(e));
    }

    updateRESTPerson = (personObj) => {
        // PATCH a person
        /*
{
  "id":3, 
  "first":"Janie",
  "last":"Doh",
  "email":"jdoe45@example.com"
}
        */
    }

    componentDidMount() {
        this.getRESTPerson(this.props.match.params.id);
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
        if (window.confirm("Are you sure you want to submit?")) {
            console.log(this.state.person);
            this.setState({
                showUpdated: true
            })
        }
    }

    render(){
        let updatedHtml;
        if (this.state.showUpdated) {
            updatedHtml = (
                <p>Updated!</p>
            );
        }


        return (
            <div>
                <h2>{this.state.person.firstName}'s Info:</h2>
                <h5>Your updates won't get submitted until you hit "Submit" below.</h5>
                <hr/>
                <form onSubmit={this.updatePerson.bind(this)}>
                    <label>First: <input type="text" name="first" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.firstName} /> </label><br></br>
                    <label>Last: <input type="text" name="last" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.lastName} /> </label><br></br>
                    <label>Email: <input type="text" name="email" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.person.email} /> </label><br></br>
                    <button>Submit</button>
                </form>
                <div>
                    {updatedHtml}
                </div>
            </div>
        );
    }
}

export default PersonDetail;