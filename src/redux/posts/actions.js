import axios from "../../axios";
import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_SUBINFO_SUCCESS,
  FETCH_POPULAR_SUBS_START,
  FETCH_POPULAR_SUBS_SUCCESS,
  FETCH_POPULAR_SUBS_FAIL,
} from "./actionTypes";

export const fetchPostsStart = (subredditName, sortBy) => ({
  type: FETCH_POSTS_START,
  subredditName: subredditName,
  sortBy: sortBy,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  posts: posts,
});

export const fetchPostsFail = (error) => ({
  type: FETCH_POSTS_FAIL,
  error: error,
});

export const fetchSubInfoSuccess = (subData) => ({
  type: FETCH_SUBINFO_SUCCESS,
  subData: subData,
});

export const fetchPosts = (subredditName, sortBy) => {
  return (dispatch) => {
    dispatch(fetchPostsStart(subredditName, sortBy));
    axios
      .get(`/r/${subredditName}/about.json`)
      .then((subData) => {
        dispatch(fetchSubInfoSuccess(subData.data.data));
      })
      .then(() => axios.get(`/r/${subredditName}/${sortBy}.json`))
      .then((response) => {
        const fetchedPosts = [];
        response.data.data.children.map((child) => fetchedPosts.push(child.data));
        dispatch(fetchPostsSuccess(fetchedPosts.slice(0, 18)));
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
      .get(`/r/${subredditName}/${sortBy}.json`)
      .then((response) => {
        const fetchedPosts = [];
        response.data.data.children.map((child) => fetchedPosts.push(child.data));
        dispatch(fetchPostsSuccess(fetchedPosts));
      })
      .catch((err) => {
        dispatch(fetchPostsFail(err));
      });
  };
};

export const fetchPopularSubsStart = () => ({
  type: FETCH_POPULAR_SUBS_START,
});

export const fetchPopularSubsSuccess = (popSubList) => ({
  type: FETCH_POPULAR_SUBS_SUCCESS,
  popSubList: popSubList,
});

export const fetchPopularSubsFail = (error) => ({
  type: FETCH_POPULAR_SUBS_FAIL,
  payload: error,
});

export const fetchPopularSubs = () => {
  return (dispatch) => {
    dispatch(fetchPopularSubsStart());
    axios
      .get(`/subreddits/popular.json`)
      .then((response) => {
        const popSubList = [];
        response.data.data.children.map((child) => popSubList.push(child.data));
        dispatch(fetchPopularSubsSuccess(popSubList.slice(0, 18)));
      })
      .catch((err) => {
        dispatch(fetchPopularSubsFail(err));
      });
  };
};
