import { FETCH_POSTS_START, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, FETCH_SUBINFO_START, FETCH_SUBINFO_SUCCESS, FETCH_SUBINFO_FAIL } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  subredditName: '',
  sortBy: '',
  subredditInfo: {},
  posts: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POSTS_START:
      return updateObject(state, { loading: true, subredditName: action.subredditName, sortBy: action.sortBy })

    case FETCH_POSTS_SUCCESS:
      return updateObject(state, {
        loading: false,
        posts: action.posts,
      })

    case FETCH_POSTS_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error
      })

    case FETCH_SUBINFO_START:
      return updateObject(state, { subredditName: action.subName })

    case FETCH_SUBINFO_SUCCESS:
      return updateObject(state, { subredditInfo: action.subData.data.data })

    case FETCH_SUBINFO_FAIL:
      return updateObject(state, { error: action.err })

    default:
      return state
  }
}

export default reducer;