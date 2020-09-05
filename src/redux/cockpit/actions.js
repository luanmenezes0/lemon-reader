import axios from '../../axios';
import {
  FETCH_POPULAR_SUBS_FAIL,
  FETCH_POPULAR_SUBS_START,
  FETCH_POPULAR_SUBS_SUCCESS,
} from './actionTypes';

export const fetchPopularSubsStart = () => ({
  type: FETCH_POPULAR_SUBS_START,
});

export const fetchPopularSubsSuccess = (popSubList) => ({
  type: FETCH_POPULAR_SUBS_SUCCESS,
  payload: { popSubList },
});

export const fetchPopularSubsFail = (error) => ({
  type: FETCH_POPULAR_SUBS_FAIL,
  payload: { error },
});

export const fetchPopularSubs = () => {
  return (dispatch) => {
    dispatch(fetchPopularSubsStart());
    axios
      .get(`/subreddits/popular.json`, {
        params: {
          limit: '21',
        },
      })
      .then((response) => {
        const popSubList = [];
        response.data.data.children.map((child) => popSubList.push(child.data));
        dispatch(fetchPopularSubsSuccess(popSubList.slice(0, 24)));
      })
      .catch((err) => {
        dispatch(fetchPopularSubsFail(err));
      });
  };
};
