import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './style.scss'
import Header from './components/Header';
import Footer from './components/Footer';
import PersonDetail from './components/PersonDetail';
import PersonSearch from './components/PersonSearch';

const About = () => {
    return <h2>About</h2>;
};
const Contact = () => {
    return <h2>Contact</h2>;
};
const Home = () => {
    return (
        <div>
            <h2>Home!</h2>
            <PersonSearch />
        </div>
    );
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PeopleDB',

        };

    }

    render() {
      return (
        <Router>
        <div>
            <Header title={this.state.title} />
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route path='/detail/:id' component={PersonDetail} />
            <Footer />
        </div>
        </Router>
      );
    }
  }
  
  export default App;
  

ReactDOM.render(<App />, document.getElementById('root'));
