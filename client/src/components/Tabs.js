import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DeleteItem from './DeleteItem';
import ItemModel from './ItemModel';
import NewListModal from './NewListModal';
import DeleteList from './DeleteList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTab } from '../actions/listsActions';

const ListContent = (props) => {
  return (
    <TabPane>
      <Row>
        <Col sm="12">
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {props.list.items.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem className="d-flex justify-content-between list-group-item-list">
                    {item.item}
                    <DeleteItem itemID={item._id} listID={props.list._id} />
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Col>
      </Row>
    </TabPane>
  );
};

class Tabs extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
    selectTab: PropTypes.func.isRequired,
  };

  onSwitchTabClick = (listID) => {
    listID !== this.props.activeTab && this.props.selectTab(listID);
  };

  render() {
    const activeTab = this.props.activeTab;

    return (
      <div>
        <Nav tabs>
          {this.props.lists.map((list) => {
            return (
              <NavItem key={list._id} style={{ lineHeight: '2' }}>
                <NavLink
                  className={classnames({
                    active: activeTab === list._id,
                  })}
                  onClick={() => {
                    this.onSwitchTabClick(list._id);
                  }}
                >
                  {list.listName}
                </NavLink>
              </NavItem>
            );
          })}
          {this.props.lists.length < 1 && (
            <h4 className="ml-auto mb-0" style={{ lineHeight: '2' }}>
              Make a new list ...
            </h4>
          )}
          <NavItem style={{ marginLeft: 'auto' }}>
            <NewListModal />
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {this.props.lists.map((list) => {
            return (
              <TabPane key={list._id} tabId={list._id}>
                <ItemModel listID={list._id} />
                <ListContent list={list} />
                <DeleteList listID={list._id} />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeTab: state.listState.activeTab,
});

export default connect(mapStateToProps, { selectTab })(Tabs);
