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
    return (
        <div>
            <h2 className="text-center">About</h2>
            <p>
                Qui ad ipsum tempor sint excepteur proident nisi nisi enim
                mollit enim irure. Reprehenderit elit ex anim aute pariatur.
                Cupidatat elit dolor ea incididunt aliqua reprehenderit. Ipsum
                Lorem anim incididunt qui incididunt excepteur laboris ad sit
                amet. In eiusmod minim do amet sunt ut sunt irure anim ad ex.
            </p>
        </div>
    );
};
const Contact = () => {
    return (
        <div>
            <h2 className="text-center">Contact</h2>
            <p>
                Qui ad ipsum tempor sint excepteur proident nisi nisi enim
                mollit enim irure. Reprehenderit elit ex anim aute pariatur.
                Cupidatat elit dolor ea incididunt aliqua reprehenderit. Ipsum
                Lorem anim incididunt qui incididunt excepteur laboris ad sit
                amet. In eiusmod minim do amet sunt ut sunt irure anim ad ex.
            </p>
        </div>
    );
};
const Home = props => {
    return (
        <Container>
            <h2 className="text-center">Home</h2>
            <p>
                This is a page where you can search for existing users, and
                modify them if they exist. If you hit the "Submit" button with
                no query, it will return all the results.
            </p>

            <p>
                Click on a result to go to their page, and click on "Create a
                new Person" at the top to create someone new.
            </p>
            <hr/>
            <PersonSearch baseRESTUrl={props.baseRESTUrl} />
        </Container>
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "PeopleDB",
            baseRESTUrl: "http://localhost:5006"
            // baseRESTUrl: "http://api.ssebs.com"
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
