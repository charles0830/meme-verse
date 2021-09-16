import { Reducer } from 'redux';
import { MemeType, UserType } from '../../types';
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

// login reducer
type LOGIN_ACTIONTYPE =
  | { type: typeof LOGIN_REQUEST }
  | { type: typeof LOGIN_SUCCESS; payload: any }
  | { type: typeof LOGIN_FAILED; payload: any }
  | { type: typeof LOGOUT };

interface LoginInitialState {
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
  userInfo: Record<string, string>;
  error: any;
}

export const loginReducer: Reducer = (
  state: LoginInitialState = {
    isAuthenticated: false,
    userInfo: {},
    loading: false,
    success: false,
    error: null,
  },
  action: LOGIN_ACTIONTYPE
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case LOGIN_FAILED:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

// register reducer
interface RegisterInitialState {
  loading: boolean;
  success: boolean;
  error: any;
}
type REGISTER_ACTIONTYPE =
  | { type: typeof REGISTER_REQUEST }
  | { type: typeof REGISTER_SUCCESS }
  | { type: typeof REGISTER_FAILED; payload: any };

export const registerReducer: Reducer = (
  state: RegisterInitialState = { loading: false, success: false, error: null },
  action: REGISTER_ACTIONTYPE
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, success: true };
    case REGISTER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get profile reducer
interface GetProfileInitialState {
  loading: boolean;
  user: UserType;
  error: any;
}
type GETPROFILE_ACTIONTYPE =
  | { type: typeof GET_PROFILE_REQUEST }
  | { type: typeof GET_PROFILE_SUCCESS; payload: any }
  | { type: typeof GET_PROFILE_FAILED; payload: any };

export const getProfileReducer: Reducer = (
  state: GetProfileInitialState = {
    loading: false,
    user: { _id: '', username: '', email: '' },
    error: null,
  },
  action: GETPROFILE_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true };
    case GET_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_PROFILE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get profile reducer
interface GetUserMemesInitialState {
  loading: boolean;
  memes: MemeType[];
  error: any;
}
type GETUSERMEMES_ACTIONTYPE =
  | { type: typeof GET_USER_MEMES_REQUEST }
  | { type: typeof GET_USER_MEMES_SUCCESS; payload: any }
  | { type: typeof GET_USER_MEMES_FAILED; payload: any };

export const getUserMemesReducer: Reducer = (
  state: GetUserMemesInitialState = {
    loading: false,
    memes: [],
    error: null,
  },
  action: GETUSERMEMES_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_USER_MEMES_REQUEST:
      return { loading: true };
    case GET_USER_MEMES_SUCCESS:
      return { loading: false, memes: action.payload };
    case GET_USER_MEMES_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// get password reset link reducer
interface GetResetLinkInitialState {
  loading: boolean;
  success: boolean;
  message: any;
  error: any;
}
type GETRESETLINK_ACTIONTYPE =
  | { type: typeof PASSWORD_RESET_LINK_REQUEST }
  | { type: typeof PASSWORD_RESET_LINK_SUCCESS; payload: any }
  | { type: typeof PASSWORD_RESET_LINK_FAILED; payload: any }
  | { type: typeof PASSWORD_RESET_LINK_RESET };

export const getPasswordResetLinkReducer: Reducer = (
  state: GetResetLinkInitialState = {
    loading: false,
    success: false,
    error: null,
    message: {},
  },
  action: GETRESETLINK_ACTIONTYPE
) => {
  switch (action.type) {
    case PASSWORD_RESET_LINK_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_LINK_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case PASSWORD_RESET_LINK_FAILED:
      return { loading: false, error: action.payload };
    case PASSWORD_RESET_LINK_RESET:
      return {};
    default:
      return state;
  }
};
// reset password reducer
interface ResetPasswordInitialState {
  loading: boolean;
  success: boolean;
  error: any;
}
type RESET_PASSWORD_ACTIONTYPE =
  | { type: typeof RESET_PASSEORD_REQUEST }
  | { type: typeof RESET_PASSEORD_SUCCESS; payload: any }
  | { type: typeof RESET_PASSEORD_FAILED; payload: any }
  | { type: typeof RESET_PASSEORD_RESET };

export const resetPasswordReducer: Reducer = (
  state: ResetPasswordInitialState = {
    loading: false,
    success: false,
    error: null,
  },
  action: RESET_PASSWORD_ACTIONTYPE
) => {
  switch (action.type) {
    case RESET_PASSEORD_REQUEST:
      return { loading: true };
    case RESET_PASSEORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSEORD_FAILED:
      return { loading: false, error: action.payload };
    case RESET_PASSEORD_RESET:
      return {};
    default:
      return state;
  }
};
