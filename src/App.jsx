import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Layout from './containers/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';

const Post = lazy(() => {
  return import('./containers/Post/Post');
});

const Cockpit = lazy(() => {
  return import('./containers/Cockpit/Cockpit');
});

const Subreddit = lazy(() => {
  return import('./containers/Subreddit/Subreddit');
});

const App = () => {
  const routes = (
    <Switch>
      <Route
        path="/r/:subreddit/comments/:postId"
        component={(props) => <Post {...props} />}
      />
      <Route
        path="/r/:subreddit"
        component={(props) => <Subreddit {...props} />}
      />
      <Route path="/" component={(props) => <Cockpit {...props} />} />
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Layout routes={routes} />
    </Suspense>
  );
};

export default App;
