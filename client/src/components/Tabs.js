import React, { useState } from 'react';
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

const ListContent = (props) => {
  return (
    <TabPane>
      <Row>
        <Col sm="12">
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {props.list.items.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem className="d-flex justify-content-between">
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

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        {props.lists.map((list, index) => {
          const tabNum = (index + 1).toString(16);
          return (
            <NavItem key={list._id}>
              <NavLink
                className={classnames({
                  active: activeTab === tabNum,
                })}
                onClick={() => {
                  toggle(tabNum);
                }}
              >
                {list.listName}
              </NavLink>
            </NavItem>
          );
        })}
        <NavItem>
          <NewListModal />
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {props.lists.map((list, index) => {
          const tabNum = (index + 1).toString(16);
          return (
            <TabPane key={list._id} tabId={`${tabNum}`}>
              <ItemModel listID={list._id} />
              <ListContent list={list} />
              <DeleteList listID={list._id} />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

export default Tabs;
