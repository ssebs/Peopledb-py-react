import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonDetail from "./components/PersonDetail";
import PersonSearch from "./components/PersonSearch";
import PersonCreate from "./components/PersonCreate";

import { Container } from "react-bootstrap";

import "./style.scss";

const About = () => {
    return <h2 className="text-center">About</h2>;
};
const Contact = () => {
    return <h2 className="text-center">Contact</h2>;
};
const Home = props => {
    return (
        <Container className="text-center">
            <h2>Home</h2>
            <p>
                This is a page where you can search for existing users, and
                modify them if they exist. If you hit the "Submit" button with
                no query, it will return all the results.
            </p>

            <p>
                Click on a result to go to their page, and click on "Create a
                new Person" at the top to create someone new.
            </p>
            <PersonSearch baseRESTUrl={props.baseRESTUrl} />
        </Container>
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "PeopleDB",
            //baseRESTUrl: "http://localhost:5000"
            baseRESTUrl: "http://api.ssebs.com"
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header title={this.state.title} />
                    <Container>
                        <Route path="/contact" component={Contact} />
                        <Route path="/about" component={About} />
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Home
                                    {...props}
                                    baseRESTUrl={this.state.baseRESTUrl}
                                />
                            )}
                        />
                        <Route
                            path="/detail/:id"
                            render={props => (
                                <PersonDetail
                                    {...props}
                                    baseRESTUrl={this.state.baseRESTUrl}
                                />
                            )}
                        />
                        <Route
                            path="/create/"
                            render={props => (
                                <PersonCreate
                                    {...props}
                                    baseRESTUrl={this.state.baseRESTUrl}
                                />
                            )}
                        />
                    </Container>

                    <br />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
