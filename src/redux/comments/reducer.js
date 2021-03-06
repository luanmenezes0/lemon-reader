import { produce } from 'immer';
import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
} from './actionTypes';

const initialState = {
  postData: {},
  commentData: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COMMENTS_START:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case FETCH_COMMENTS_SUCCESS:
      const { postData, commentData } = payload;
      return produce(state, (draft) => {
        draft.postData = postData;
        draft.commentData = commentData;
        draft.loading = false;
      });

    case FETCH_COMMENTS_FAIL:
      const { err } = payload;
      return produce(state, (draft) => {
        draft.error = err;
        draft.loading = false;
      });

    default:
      return state;
  }
};

export default reducer;
