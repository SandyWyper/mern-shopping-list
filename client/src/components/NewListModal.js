import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addList } from '../actions/listsActions';
import PropTypes from 'prop-types';

class NewListModal extends Component {
  state = { modal: false, listName: '' };

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userID: PropTypes.string,
    addList: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();

    const newList = {
      listName: this.state.listName,
      userID: this.props.userID,
    };

    // Add item action
    this.props.addList(newList);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <Button
            color="success"
            style={{ marginRight: '1rem' }}
            onClick={this.toggle}
          >
            &#43;
          </Button>
        ) : (
          <h4>Please login to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="listName">List</Label>
                <Input
                  type="text"
                  name="listName"
                  id="list"
                  placeholder="Add list name"
                  onChange={this.onChange}
                  autoFocus
                />
                <Button color="success" style={{ marginTop: '2rem' }} block>
                  Add List
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  userID: state.authState.user._id,
});

export default connect(mapStateToProps, { addList })(NewListModal);
