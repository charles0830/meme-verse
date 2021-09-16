import axios from 'axios';
import { Dispatch } from 'redux';
import { baseURL } from '../../baseURL';
import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_MEMES_FAILED,
  GET_USER_MEMES_REQUEST,
  GET_USER_MEMES_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_LINK_FAILED,
  PASSWORD_RESET_LINK_REQUEST,
  PASSWORD_RESET_LINK_RESET,
  PASSWORD_RESET_LINK_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSEORD_FAILED,
  RESET_PASSEORD_REQUEST,
  RESET_PASSEORD_RESET,
  RESET_PASSEORD_SUCCESS,
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
// get user profile
export const getProfile =
  (userId: any) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PROFILE_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/api/user/${userId}`, config);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PROFILE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get user memes
export const getUserMemes = () => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch({
      type: GET_USER_MEMES_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${baseURL}/api/user/getUserMemes`,
      config
    );

    dispatch({
      type: GET_USER_MEMES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_USER_MEMES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// get password reset link
export const getPasswordResetLink =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: PASSWORD_RESET_LINK_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${baseURL}/api/user/getPasswordResetLink`,
        { email },
        config
      );

      dispatch({
        type: PASSWORD_RESET_LINK_SUCCESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({
          type: PASSWORD_RESET_LINK_RESET,
        });
      }, 3000);
    } catch (error: any) {
      dispatch({
        type: PASSWORD_RESET_LINK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: PASSWORD_RESET_LINK_RESET,
        });
      }, 2000);
    }
  };
// reset password from link
export const resetPassword =
  (token: string, values: { newPass: string; conPass: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: RESET_PASSEORD_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `${baseURL}/api/user/resetPasswordFromLink/${token}`,
        values,
        config
      );

      dispatch({
        type: RESET_PASSEORD_SUCCESS,
      });

      setTimeout(() => {
        dispatch({
          type: RESET_PASSEORD_RESET,
        });
      }, 2000);
    } catch (error: any) {
      dispatch({
        type: RESET_PASSEORD_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: RESET_PASSEORD_RESET,
        });
      }, 2000);
    }
  };
