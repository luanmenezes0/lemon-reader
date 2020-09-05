import { produce } from 'immer';
import {
  FETCH_POPULAR_SUBS_START,
  FETCH_POPULAR_SUBS_SUCCESS,
  FETCH_POPULAR_SUBS_FAIL,
} from './actionTypes';

const initialState = {
  popularSubreddits: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_SUBS_START:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case FETCH_POPULAR_SUBS_SUCCESS:
      const { popSubList } = payload;
      return produce(state, (draft) => {
        draft.loading = false;
        draft.popularSubreddits = popSubList;
      });

    case FETCH_POPULAR_SUBS_FAIL:
      const { error } = payload;
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = error;
      });

    default:
      return state;
  }
};

export default reducer;
