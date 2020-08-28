import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts/reducer';
import commentsReducer from './comments/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;