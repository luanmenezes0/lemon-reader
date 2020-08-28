import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_SUBINFO_START,
  FETCH_SUBINFO_SUCCESS,
  FETCH_SUBINFO_FAIL,
  FETCH_POPULAR_SUBS_START,
  FETCH_POPULAR_SUBS_SUCCESS,
  FETCH_POPULAR_SUBS_FAIL,
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  subredditName: "",
  sortBy: "",
  subredditInfo: {},
  posts: [],
  popularSubreddits: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return updateObject(state, {
        loading: true,
        subredditName: action.subredditName,
        sortBy: action.sortBy,
      });

    case FETCH_POSTS_SUCCESS:
      return updateObject(state, {
        loading: false,
        posts: action.posts,
      });

    case FETCH_POSTS_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });

    case FETCH_SUBINFO_START:
      return updateObject(state, { subredditName: action.subName });

    case FETCH_SUBINFO_SUCCESS:
      return updateObject(state, { subredditInfo: action.subData });

    case FETCH_SUBINFO_FAIL:
      return updateObject(state, { error: action.err });

    case FETCH_POPULAR_SUBS_START:
      return updateObject(state, { loading: true });

    case FETCH_POPULAR_SUBS_SUCCESS:
      return updateObject(state, {
        loading: false,
        popularSubreddits: action.popSubList,
      });

    case FETCH_POPULAR_SUBS_FAIL:
      return updateObject(state, { loading: false, error: action.payload });

    default:
      return state;
  }
};

export default reducer;
