import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  getBankDataRequest,
  getBankDataSuccess,
  getBankDataError
} from './bankData-actions';
import { logoutSuccess } from '../auth/auth-actions';


const data = createReducer(null, {
  [getBankDataSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: () => null,
});

// const error = createReducer(null, {
//   [getBankDataError]: (_, { payload }) => payload,
// });

const isLoading = createReducer(false, {
  [getBankDataRequest]: () => true,
  [getBankDataSuccess]: () => false,
  [getBankDataError]: () => false,
});

export default combineReducers({
  data,
  isLoading,
});
