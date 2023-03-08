import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  Container,
} from "reactstrap";
import RegisterModel from "./auth/RegisterModel";
import LoginModel from "./auth/LoginModel";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
          <span className="welcome-message mr-3">
            {user && `Welcome ${user.name}`}
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
        <Navbar className="b-b-pink bg-blue" fixed="top" expand="sm">
          <Container>
            {/* <NavbarBrand className="text-warning">Shopping List</NavbarBrand> */}
            {/* <NavbarToggler onClick={this.toggle} /> */}
            <button
              className={`hamburger hamburger--collapse d-sm-none ${
                this.state.isOpen ? "is-active" : ""
              }`}
              type="button"
              onClick={this.toggle}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {/* <NavItem>
                  <NavLink href="https://github.com/sandywyper">GitHub</NavLink>
                </NavItem> */}
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
