import axios from 'axios';
import { financeOperation } from '../finance';
import {
  // getError,
  registerRequest,
  registerSuccess,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  logoutRequest,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from './auth-actions';

axios.defaults.baseURL = 'http://localhost:5000';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = userData => async dispatch => {
  dispatch(registerRequest());

  try {
    const res = await axios.post('/api/register', userData);
    console.log(res.data);
    token.set(res.data.token)
    dispatch(registerSuccess(res.data));
  } catch (error) {
    console.error(error);
  }
};

const login = userData => async dispatch => {
  dispatch(loginRequest());

  try {
    const res = await axios.post('/api/login', userData);
    token.set(res.data.token);
    dispatch(loginSuccess(res.data.user));
    dispatch(financeOperation.getFinance());
  } catch (error) {
    console.error(error);
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);;
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: {
      token: persistedToken,
      user: { id },
    },
  } = getState();
  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  try {
    dispatch(getCurrentUserRequest());
    const {
      data: {
        finance: { totalBalance: balance, data },
      },
    } = await axios.get(`api/finance/${id}`);
    dispatch(getCurrentUserSuccess({ balance, data }));
  } catch (error) {
    console.error(error);;
  }
};

export {
  logOut,
  getCurrentUser,
  register,
  login,
  token,
};
