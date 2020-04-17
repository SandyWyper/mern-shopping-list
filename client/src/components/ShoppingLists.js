import React, { Component, useState } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getLists } from '../actions/listsActions';
import PropTypes from 'prop-types';
import Tabs from './Tabs';
import classnames from 'classnames';

class ShoppingList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    lists: PropTypes.object.isRequired,
    getLists: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    isAuthenticated
      ? this.props.getLists(user._id)
      : console.log('not authenticated yet', this.props, isAuthenticated);
  }
  render() {
    const { lists } = this.props.lists;
    return (
      <Container>
        <Tabs lists={lists} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.listState,
  auth: state.authState,
});

export default connect(mapStateToProps, { getLists })(ShoppingList);
