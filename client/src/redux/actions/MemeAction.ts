import axios from 'axios';
import { Dispatch } from 'redux';
import { baseURL } from '../../baseURL';
import {
  COMMENT_FAILED,
  COMMENT_SUCCESS,
  CREATE_MEME_FAILED,
  CREATE_MEME_SUCCESS,
  GET_COMMENTS_FAILED,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_MEMES_FAILED,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
  GET_SINGLE_MEME_REQUEST,
  GET_SINGLE_MEME_SUCCESS,
  MEME_LIKED_SUCCESS,
  MEME_LIKED_FAILED,
  DELETE_MEME_REQUEST,
  DELETE_MEME_SUCCESS,
  DELETE_MEME_FAILED,
  DELETE_MEME_RESET,
} from '../actionTypes';

// get all memes
export const getMemes = () => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch({
      type: GET_MEMES_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseURL}/api/meme`, config);

    dispatch({
      type: GET_MEMES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_MEMES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// create a meme
export const createMeme =
  (image: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/api/meme`,
        { image },
        config
      );

      dispatch({
        type: CREATE_MEME_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_MEME_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// create a meme
export const deleteMeme =
  (memeId: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: DELETE_MEME_REQUEST,
      });
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${baseURL}/api/meme/${memeId}`, config);

      dispatch({
        type: DELETE_MEME_SUCCESS,
      });

      setTimeout(() => {
        dispatch({
          type: DELETE_MEME_RESET,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: DELETE_MEME_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get single meme
export const getMeme =
  (memeId: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_SINGLE_MEME_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/api/meme/${memeId}`, config);

      dispatch({
        type: GET_SINGLE_MEME_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_MEMES_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get single meme comments
// eslint-disable-next-line import/prefer-default-export
export const getComments =
  (memeId: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_COMMENTS_REQUEST,
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
        `${baseURL}/api/meme/${memeId}/comments`,
        config
      );

      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_COMMENTS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get single meme comments
export const commentOnMeme =
  (memeId: string, comment: string) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/api/meme/${memeId}/comments`,
        { comment },
        config
      );

      dispatch({
        type: COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: COMMENT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get single meme comments
export const likeMeme =
  (memeId: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/api/meme/${memeId}/like`,
        {},
        config
      );
      dispatch({
        type: MEME_LIKED_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: MEME_LIKED_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
