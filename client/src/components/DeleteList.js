import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList } from '../actions/listsActions';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class DeleteList extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    deleteList: PropTypes.func.isRequired,
  };
  onDeleteClick = () => {
    this.props.deleteList(this.props.listID);
  };
  render() {
    return (
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={this.onDeleteClick}
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
