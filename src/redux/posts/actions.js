import axios from '../../axios';
import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_SUBINFO_SUCCESS,
} from './actionTypes';

export const fetchPostsStart = (subredditName, sortBy) => ({
  type: FETCH_POSTS_START,
  payload: { subredditName, sortBy },
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts },
});

export const fetchPostsFail = (error) => ({
  type: FETCH_POSTS_FAIL,
  payload: { error },
});

export const fetchSubInfoSuccess = (subData) => ({
  type: FETCH_SUBINFO_SUCCESS,
  payload: { subData },
});

export const fetchPosts = (subredditName, sortBy) => {
  return (dispatch) => {
    dispatch(fetchPostsStart(subredditName, sortBy));
    axios
      .get(`/r/${subredditName}/about.json`)
      .then((response) => {
        const subData = response.data.data;
        dispatch(fetchSubInfoSuccess(subData));
      })
      .then(() =>
        axios.get(`/r/${subredditName}/${sortBy}.json`, {
          params: {
            limit: '36',
          },
        })
      )
      .then((response) => {
        const fetchedPosts = [];
        response.data.data.children.map((child) =>
          fetchedPosts.push(child.data)
        );
        dispatch(fetchPostsSuccess(fetchedPosts));
      })
      .catch((err) => {
        dispatch(fetchPostsFail(err));
      });
  };
};

export const sortPosts = (subredditName, sortBy) => {
  return (dispatch) => {
    dispatch(fetchPostsStart(subredditName, sortBy));
    axios
      .get(`/r/${subredditName}/${sortBy}.json`, {
        params: {
          limit: '36',
        },
      })
      .then((response) => {
        const fetchedPosts = [];
        response.data.data.children.map((child) =>
          fetchedPosts.push(child.data)
        );
        dispatch(fetchPostsSuccess(fetchedPosts));
      })
      .catch((err) => {
        dispatch(fetchPostsFail(err));
      });
  };
};
