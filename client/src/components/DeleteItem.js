import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/listsActions';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class DeleteItem extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
  };
  onDeleteClick = () => {
    this.props.deleteItem(this.props.itemID, this.props.listID);
  };
  render() {
    return (
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={this.onDeleteClick}
      >
        &times;
      </Button>
    );
  }
}
const mapStateToProps = (state) => ({
  lists: state.listState,
});

export default connect(mapStateToProps, { deleteItem })(DeleteItem);
