import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
} from "./actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  postData: {},
  commentData: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
      return updateObject(state, { loading: true });

    case FETCH_COMMENTS_SUCCESS:
      return updateObject(state, {
        postData: action.postData,
        commentData: action.commentData,
        loading: false,
      });

    case FETCH_COMMENTS_FAIL:
      return updateObject(state, { error: action.error, loading: false });

    default:
      return state;
  }
};

export default reducer;
