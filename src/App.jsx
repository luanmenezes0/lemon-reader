import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Subreddit from "./containers/Subreddit/Subreddit";
import Cockpit from "./containers/Cockpit/Cockpit";
import Post from "./containers/Post/Post";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Header />
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10} container justify="center">
              <Switch>
                <Route path="/r/:subreddit/comments/:postId" component={Post} />
                <Route path="/r/:subreddit" component={Subreddit} />
                <Route path="/" component={Cockpit} />
                <Route component={NotFound} />
              </Switch>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
};

export default App;
