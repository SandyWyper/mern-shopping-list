import React, { Component } from "react";
import AppNavbar from "./AppNavbar";
import ShoppingLists from "./ShoppingLists";

import GettingStarted from "./GettingStarted";
import { Container, Spinner } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppWrapper extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, isLoading } = this.props.auth;
    return (
      <>
        <AppNavbar />
        <Container style={{ paddingTop: "6rem" }}>
          {isLoading ? (
            <Spinner color="secondary" className="mx-auto d-block" />
          ) : isAuthenticated ? (
            <ShoppingLists />
          ) : (
            <GettingStarted />
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authState,
});

export default connect(mapStateToProps, null)(AppWrapper);
