import {
  LISTS_LOADING,
  LISTS_LOADED,
  LISTS_ADD,
  LISTS_DELETE,
  ITEM_ADD,
  ITEM_DELETE,
} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

const setListsLoading = () => {
  return {
    type: LISTS_LOADING,
  };
};

export const getLists = (userID) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ userID });

  dispatch(setListsLoading());

  axios
    .get('/api/lists', body, config)
    .then((res) => {
      dispatch({
        type: LISTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (itemID, listID) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ listID, itemID });

  axios
    .post(`/api/lists/delete/item`, body, config)
    .then((res) => {
      dispatch({
        type: ITEM_DELETE,
        payload: body,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (newItem) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(newItem);
  axios
    .post('./api/lists', body, config)
    .then((res) =>
      dispatch({
        type: ITEM_ADD,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addList = (newList) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(newList);

  axios
    .post('./api/lists/new', body, config)
    .then((res) =>
      dispatch({
        type: LISTS_ADD,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteList = (listID) => (dispatch, getState) => {
  axios
    .delete(`./api/lists/delete/list/${listID}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: LISTS_DELETE,
        payload: listID,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
