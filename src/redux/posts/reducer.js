import { produce } from 'immer';
import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_SUBINFO_SUCCESS,
} from './actionTypes';

const initialState = {
  subredditName: '',
  sortBy: '',
  subredditInfo: {},
  posts: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS_START:
      const { subredditName, sortBy } = payload;
      return produce(state, (draft) => {
        draft.loading = true;
        draft.subredditName = subredditName;
        draft.sortBy = sortBy;
      });

    case FETCH_POSTS_SUCCESS:
      const { posts } = payload;
      return produce(state, (draft) => {
        draft.loading = false;
        draft.posts = posts;
      });

    case FETCH_POSTS_FAIL:
      const { error } = payload;
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = error;
      });

    case FETCH_SUBINFO_SUCCESS:
      const { subData } = payload;
      return produce(state, (draft) => {
        draft.subredditInfo = subData;
      });

    default:
      return state;
  }
};

export default reducer;
