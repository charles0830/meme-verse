import axios from 'axios';
import { Dispatch } from 'redux';
import { baseURL } from '../../baseURL';
import {
  GET_MEMES_FAILED,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
} from '../actionTypes';

// get all memes
// eslint-disable-next-line import/prefer-default-export
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
