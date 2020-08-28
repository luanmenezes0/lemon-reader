import axios from "../../axios";
import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
} from "./actionTypes";

export const fetchCommentsStart = (subredditName, postId) => ({
  type: FETCH_COMMENTS_START,
  subredditName: subredditName,
  postId: postId,
});

export const fetchCommentsSuccess = (postData, commentData) => ({
  type: FETCH_COMMENTS_SUCCESS,
  postData: postData,
  commentData: commentData,
});

export const fetchCommentsFail = (err) => ({
  type: FETCH_COMMENTS_FAIL,
  error: err,
});

export const fetchComments = (subredditName, postId) => {
  return (dispatch) => {
    dispatch(fetchCommentsStart(subredditName, postId));
    axios
      .get(`/r/${subredditName}/comments/${postId}.json`)
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
