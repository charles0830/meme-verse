import { Reducer } from 'redux';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../actionTypes';

type LOGIN_ACTIONTYPE =
  | { type: typeof LOGIN_REQUEST }
  | { type: typeof LOGIN_SUCCESS; payload: any }
  | { type: typeof LOGIN_FAILED; payload: any }
  | { type: typeof LOGOUT };

type REGISTER_ACTIONTYPE =
  | { type: typeof REGISTER_REQUEST }
  | { type: typeof REGISTER_SUCCESS }
  | { type: typeof REGISTER_FAILED; payload: any };

interface LoginInitialState {
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
  userInfo: Record<string, string>;
  error: any;
}

interface RegisterInitialState {
  loading: boolean;
  success: boolean;
  error: any;
}

export const loginReducer: Reducer = (
  state: LoginInitialState | undefined = {
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

export const registerReducer = (
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
