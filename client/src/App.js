import React, { Component } from 'react';
import AppWrapper from './components/AppWrapper';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  componentDidMount() {
    localStorage.getItem('token') && store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AppWrapper className="App" />
      </Provider>
    );
  }
}
