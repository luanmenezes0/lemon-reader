import axios from '../../axios';
import { FETCH_POSTS_START, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, FETCH_SUBINFO_SUCCESS } from './actionTypes';

export const fetchPostsStart = (subredditName, sortBy) => ({
  type: FETCH_POSTS_START,
  subredditName: subredditName,
  sortBy: sortBy,
})

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  posts: posts
})

export const fetchSubInfoSuccess = (subData) => ({
  type: FETCH_SUBINFO_SUCCESS,
  subData: subData
})

export const fetchPostsFail = (error) => ({
  type: FETCH_POSTS_FAIL,
  error: error
})

export const sortPosts = (subredditName, sortBy) => {
  return (dispatch) => {
    dispatch(fetchPostsStart(subredditName, sortBy))
    axios
      .get(`/${subredditName}/${sortBy}.json`)
      .then((response) => {
        const fetchedPosts = response.data.data.children.slice(0, 10)
        dispatch(fetchPostsSuccess(fetchedPosts))
      })
      .catch((err) => {
        dispatch(fetchPostsFail(err))
      });
  }
}

export const fetchPosts = (subredditName, sortBy) => {
  if (subredditName === 'all') {
    return (dispatch) => {
      dispatch(fetchPostsStart(subredditName, sortBy))
      axios
        .get(`/${subredditName}/${sortBy}.json`)
        .then((response) => {
          const fetchedPosts = response.data.data.children.slice(0, 10)
          dispatch(fetchPostsSuccess(fetchedPosts))
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchPostsFail(err))
        });
    }
  } else {
    return (dispatch) => {
      dispatch(fetchPostsStart(subredditName, sortBy))
      axios
        .get(`/${subredditName}/about.json`)
        .then((subData) => {
          dispatch(fetchSubInfoSuccess(subData))
        })
        .then(() => axios.get(`/${subredditName}/${sortBy}.json`))
        .then((response) => {
          const fetchedPosts = response.data.data.children.slice(0, 10)
          dispatch(fetchPostsSuccess(fetchedPosts))
        })
        .catch((err) => {
          dispatch(fetchPostsFail(err))
        });
    }

  }
}