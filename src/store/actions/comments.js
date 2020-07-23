import axios from '../../axios';
import { FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAIL } from './actionTypes';

export const fetchCommentsStart = (subredditName, postId) => ({
  type: FETCH_COMMENTS_START,
  subredditName:subredditName,
  postId: postId
})

export const fetchCommentsSuccess = (postData) => ({
  type: FETCH_COMMENTS_SUCCESS,
  postData: postData
})

export const fetchCommentsFail = (err) => ({
  type: FETCH_COMMENTS_FAIL,
  error: err
})

export const fetchComments = (subredditName, postId) => {
  return dispatch => {
    dispatch(fetchCommentsStart(subredditName, postId))
    axios
      .get(`/${subredditName}/comments/${postId}.json`)
      .then((postData) => {
        dispatch(fetchCommentsSuccess(postData.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(fetchCommentsFail(err))
      });
  }
}

