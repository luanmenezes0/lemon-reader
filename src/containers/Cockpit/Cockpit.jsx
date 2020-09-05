import React, { useCallback, useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularSubs } from '../../redux/cockpit/actions';
import SubredditCard from '../../components/SubredditCard/SubredditCard';
import Spinner from '../../components/UI/Spinner/Spinner';

const Cockpit = (props) => {
  const popSubreddits = useSelector((state) => state.cockpit.popularSubreddits);
  const loading = useSelector((state) => state.cockpit.loading);
  const error = useSelector((state) => state.cockpit.error);

  const dispatch = useDispatch();
  const onFetchPopSubreddits = useCallback(() => dispatch(fetchPopularSubs()), [
    dispatch,
  ]);

  useEffect(() => {
    onFetchPopSubreddits();
  }, [onFetchPopSubreddits]);

  let cockpit = <Spinner />;

  if (!loading) {
    cockpit = (
      <>
        <Grid item>
          <Box>
            <Typography color="textPrimary" variant="h3" component="h1">
              Popular Subreddits
            </Typography>
          </Box>

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
  }

  return error ? <Alert severity="error">{error.message}</Alert> : cockpit;
};

export default Cockpit;
