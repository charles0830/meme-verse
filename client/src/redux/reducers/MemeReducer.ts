import { Reducer } from 'redux';
import { CommentType, MemeType } from '../../types';
import {
  COMMENT_FAILED,
  COMMENT_SUCCESS,
  GET_COMMENTS_FAILED,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_MEMES_FAILED,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
  GET_SINGLE_MEME_FAILED,
  GET_SINGLE_MEME_REQUEST,
  GET_SINGLE_MEME_SUCCESS,
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
// get single meme reducer
interface GetMemeInitialState {
  loading: boolean;
  meme: MemeType;
  error: any;
}
type GETPMEME_ACTIONTYPE =
  | { type: typeof GET_SINGLE_MEME_REQUEST }
  | { type: typeof GET_SINGLE_MEME_SUCCESS; payload: any }
  | { type: typeof GET_SINGLE_MEME_FAILED; payload: any };

export const getMemeReducer: Reducer = (
  state: GetMemeInitialState = {
    loading: false,
    meme: {
      _id: '',
      image: '',
      like: 0,
      user: { _id: '', email: '', username: '' },
      createdAt: '',
    },
    error: null,
  },
  action: GETPMEME_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_SINGLE_MEME_REQUEST:
      return { loading: true };
    case GET_SINGLE_MEME_SUCCESS:
      return { loading: false, meme: action.payload };
    case GET_SINGLE_MEME_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// get single meme comments reducer
interface GetCommentsInitialState {
  loading: boolean;
  comments: CommentType[];
  error: any;
  commentSuccess: boolean;
  commentError: any;
}
type GETPCOMMENTS_ACTIONTYPE =
  | { type: typeof GET_COMMENTS_REQUEST }
  | { type: typeof GET_COMMENTS_SUCCESS; payload: any }
  | { type: typeof COMMENT_SUCCESS; payload: any }
  | { type: typeof COMMENT_FAILED; payload: any }
  | { type: typeof GET_COMMENTS_FAILED; payload: any };

export const getCommentsReducer: Reducer = (
  state: GetCommentsInitialState = {
    loading: false,
    comments: [],
    error: null,
    commentSuccess: false,
    commentError: null,
  },
  action: GETPCOMMENTS_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true };
    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_SUCCESS:
      return {
        loading: false,
        commentSuccess: true,
        comments: [action.payload, ...state.comments],
      };
    case COMMENT_FAILED:
      return { loading: false, commentError: action.payload };
    case GET_COMMENTS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
