import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import './style.scss'

const About = () => <h2>About</h2>;
const Contact = () => <h2>Contact</h2>;
const Home = () => <h1>Home!</h1>;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PeopleDB'
        };

    }

    render() {
      return (
        <Router>
        <div>
            <Header title={this.state.title} />
            <p>Main body here</p>
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Footer />
        </div>
        </Router>
      );
    }
  }
  
  export default App;
  

ReactDOM.render(<App />, document.getElementById('root'));
