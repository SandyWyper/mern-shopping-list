import { combineReducers } from 'redux';
import listReducer from './listReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  listState: listReducer,
  errorState: errorReducer,
  authState: authReducer,
});
