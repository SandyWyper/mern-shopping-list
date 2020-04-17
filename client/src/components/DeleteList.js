import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList } from '../actions/listsActions';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class DeleteList extends Component {
  static propTypes = {
    deleteList: PropTypes.func.isRequired,
    lists: PropTypes.object.isRequired,
  };
  onDeleteClick = () => {
    this.props.deleteList(this.props.listID);
  };
  render() {
    return (
      <Button
        className="remove-btn my-5"
        color="danger"
        size="sm"
        onClick={() => {
          if (window.confirm('Are you sure you wish to delete this list?'))
            this.onDeleteClick();
        }}
      >
        Delete List
      </Button>
    );
  }
}
const mapStateToProps = (state) => ({
  lists: state.listState,
});

export default connect(mapStateToProps, { deleteList })(DeleteList);
