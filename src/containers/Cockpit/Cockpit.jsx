import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularSubs } from "../../redux/posts/actions";
import { Grid } from "@material-ui/core";
import SubredditCard from "../../components/SubredditCard/SubredditCard";

const Cockpit = (props) => {
  const popSubreddits = useSelector((state) => state.posts.popularSubreddits);
  const dispatch = useDispatch();
  const onFetchPopSubreddits = useCallback(() => dispatch(fetchPopularSubs()), [
    dispatch,
  ]);

  useEffect(() => {
    onFetchPopSubreddits();
  }, [onFetchPopSubreddits]);

  return (
    <>
      <Grid item>
        <Grid container wrap="wrap" justify="space-evenly" spacing={2}>
          {popSubreddits.map((sub) => (
            <Grid item xs={12} sm={6} lg={4} key={sub.name}>
              <SubredditCard {...sub} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Cockpit;
