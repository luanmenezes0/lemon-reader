import axios from '../../axios';
import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
} from './actionTypes';

export const fetchCommentsStart = (subredditName, postId) => ({
  type: FETCH_COMMENTS_START,
  payload: { subredditName, postId },
});

export const fetchCommentsSuccess = (postData, commentData) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { postData, commentData },
});

export const fetchCommentsFail = (err) => ({
  type: FETCH_COMMENTS_FAIL,
  payload: { err },
});

export const fetchComments = (subredditName, postId) => {
  return (dispatch) => {
    dispatch(fetchCommentsStart(subredditName, postId));
    axios
      .get(`/r/${subredditName}/comments/${postId}.json`, {
        params: {
          limit: '30',
          depth: '2',
        },
      })
      .then((response) => {
        const postData = response.data[0].data.children[0].data;
        const commentData = response.data[1].data.children;
        dispatch(fetchCommentsSuccess(postData, commentData));
      })
      .catch((err) => {
        dispatch(fetchCommentsFail(err));
      });
  };
};
