import axios from 'axios';
import { Dispatch } from 'redux';
import { baseURL } from '../../baseURL';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../actionTypes';

interface loginCredentials {
  usernameOrEmail: string;
  password: string;
}

interface registerCredentials {
  email: string;
  username: string;
  password: string;
}

// user login
export const login =
  (credentials: loginCredentials) => async (dispatch: any) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/user/login`,
        credentials,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      // set token
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// user register
export const register =
  (credentials: registerCredentials) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/user/register`,
        credentials,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
      });

      // login after successfull registration
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// logout
export const devSignout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: LOGOUT,
  });
};
