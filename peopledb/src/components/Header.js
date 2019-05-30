import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Navbar, Nav } from "react-bootstrap";

const Header = props => (
    <Navbar bg="primary" variant="dark" expand="sm" collapseOnSelect>
        <Container>
            <LinkContainer to="/" >
                <Navbar.Brand >{props.title}</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="ml-auto font-weight-bold" style={{fontSize:"1.15rem"}}>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/create">
                        <Nav.Link>Create a new Person</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default Header;
