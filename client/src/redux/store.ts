import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {
  getPasswordResetLinkReducer,
  getProfileReducer,
  getUserMemesReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
} from './reducers/UserReducer';
import {
  getCommentsReducer,
  getMemeReducer,
  getMemesReducer,
} from './reducers/MemeReducer';

const reducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
  profileGet: getProfileReducer,
  memesGet: getMemesReducer,
  memeGet: getMemeReducer,
  commentsGet: getCommentsReducer,
  userMemesGet: getUserMemesReducer,
  resetLinkGet: getPasswordResetLinkReducer,
  passwordReset: resetPasswordReducer,
});

const verifyToken = (token: string, lsItem: string): boolean => {
  const currentDate = new Date();
  const { exp } = jwtDecode<JwtPayload>(token);
  if (exp)
    if (currentDate.getTime() > exp * 1000) {
      localStorage.removeItem(lsItem);
      return false;
    }
  return true;
};

interface initialStateType {
  auth: {
    isAuthenticated: boolean;
    userInfo: Record<string, string>;
  };
}

const initialState: initialStateType = {
  auth: {
    isAuthenticated: localStorage.getItem('userInfo')
      ? verifyToken(
          JSON.parse(localStorage.getItem('userInfo') as string).token,
          'userInfo'
        )
      : false,
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') as string)
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
