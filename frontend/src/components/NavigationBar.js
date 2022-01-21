import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <Link className='nav-link' to='/login' onClick={logout}>Logout</Link>
        </li>
    );

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="">Quiz App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to='/'>Home</Link>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);
