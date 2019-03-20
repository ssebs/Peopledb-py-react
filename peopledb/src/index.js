import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonDetail from "./components/PersonDetail";
import PersonSearch from "./components/PersonSearch";

const About = () => {
    return <h2>About</h2>;
};
const Contact = () => {
    return <h2>Contact</h2>;
};
const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut nisl velit. Donec sed tempus urna. Duis a rhoncus odio. Nunc
                lacus dui, dictum id mattis mattis, luctus non tellus. Nulla non
                metus eget mi placerat consequat. Nulla ut vestibulum augue,
                eget fringilla neque. Ut vehicula arcu diam, nec porta mauris
                vulputate at. Nam et metus ornare, pretium magna eu, facilisis
                dui. Etiam molestie sagittis nibh a aliquet. Vivamus mi massa,
                tristique commodo nunc vulputate, consectetur efficitur est.
                Donec ultrices imperdiet urna quis rhoncus.
            </p>
            <PersonSearch />
        </div>
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "PeopleDB"
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <Header title={this.state.title} />
                    <Route exact path='/' component={Home} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/about' component={About} />
                    <Route path='/detail/:id' component={PersonDetail} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
