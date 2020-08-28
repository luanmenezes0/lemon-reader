import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Panel from "../../components/Panel/Panel";
import PostCard from "../../components/PostCard/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/posts/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import NotFound from "../../components/NotFound/NotFound";
import { useCallback } from "react";

export const Subreddit = (props) => {

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const { match } = props;
  
  const dispatch = useDispatch();
  const onFetchPosts = useCallback(
    (subredditName, sortBy) => dispatch(fetchPosts(subredditName, sortBy)),
    [dispatch]
  );

  useEffect(() => {
    if (match.params.subreddit) {
      let url = match.params.subreddit;
      onFetchPosts(url, "hot");
    }
  }, [match, onFetchPosts]);

  let frontPage = <Spinner />;
  if (!loading) {
    frontPage = (
      <>
        <Panel sort={onFetchPosts} />
        <Grid container wrap="wrap" justify="space-evenly" spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} lg={4} xl={3}>
              <PostCard {...post} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return error ? <NotFound /> : frontPage;
};

export default Subreddit;
