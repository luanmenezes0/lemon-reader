import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import FrontPage from './containers/FrontPage/FrontPage';
import Post from './components/Post/Post';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <div >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Header />
          </Grid>
          <Grid item>
            <Switch>
              <Redirect exact from="/" to="/r/" />
              <Route path="/r/:subreddit/comments/:postId" component={Post} />
              <Route path="/r/:subreddit" component={FrontPage} />
              <Route path="/r/" component={FrontPage} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>

  );
}

export default App;
