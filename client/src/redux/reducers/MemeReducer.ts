import { Reducer } from 'redux';
import { MemeType } from '../../types';
import {
  GET_MEMES_FAILED,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
} from '../actionTypes';

// get all meme reducer

interface GetMemesInitialState {
  loading: boolean;
  memes: MemeType[];
  error: any;
}
type GETPMEMES_ACTIONTYPE =
  | { type: typeof GET_MEMES_REQUEST }
  | { type: typeof GET_MEMES_SUCCESS; payload: any }
  | { type: typeof GET_MEMES_FAILED; payload: any };

// eslint-disable-next-line import/prefer-default-export
export const getMemesReducer: Reducer = (
  state: GetMemesInitialState = {
    loading: false,
    memes: [],
    error: null,
  },
  action: GETPMEMES_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_MEMES_REQUEST:
      return { loading: true };
    case GET_MEMES_SUCCESS:
      return { loading: false, memes: action.payload };
    case GET_MEMES_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
