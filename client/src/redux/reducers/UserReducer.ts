import { Reducer } from 'redux';
import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
type UserType = { username: string; email: string };
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
    user: { username: '', email: '' },
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
