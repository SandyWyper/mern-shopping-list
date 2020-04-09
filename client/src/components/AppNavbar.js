import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import RegisterModel from './auth/RegisterModel';
import LoginModel from './auth/LoginModel';
import Logout from './auth/Logout';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user && `Welcome ${user.name}`}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );
    const guestLinks = (
      <>
        <NavItem>
          <RegisterModel />
        </NavItem>
        <NavItem>
          <LoginModel />
        </NavItem>
      </>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/sandywyper">GitHub</NavLink>
                </NavItem>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authState,
});

export default connect(mapStateToProps, null)(AppNavbar);
