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
import { addItem } from '../actions/listsActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = { modal: false, name: '' };

  static propTypes = {
    isAuthenitcated: PropTypes.bool,
    addItem: PropTypes.func.isRequired,
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

    const newItem = {
      item: this.state.name,
      listID: this.props.listID,
    };

    // Add item action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ margin: '2rem 0' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4>Please login to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                  autoFocus
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
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
});

export default connect(mapStateToProps, { addItem })(ItemModal);
