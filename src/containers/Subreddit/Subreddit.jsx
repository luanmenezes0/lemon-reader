import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { fetchPosts } from '../../redux/posts/actions';
import Panel from '../../components/Panel/Panel';
import PostCard from '../../components/PostCard/PostCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';

export const Subreddit = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();
  const onFetchPosts = useCallback(
    (subredditName, sortBy) => dispatch(fetchPosts(subredditName, sortBy)),
    [dispatch]
  );

  const { subreddit } = useParams();
  useEffect(() => {
    onFetchPosts(subreddit, 'hot');
  }, [subreddit, onFetchPosts]);

  const pagesCount = Math.ceil(posts.length / 12);
  const indexOfLastPost = currentPage * 12;
  const indexOfFirstPost = indexOfLastPost - 12;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = (e, selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let frontPage = <Spinner />;
  if (!loading) {
    frontPage = (
      <>
        <Panel sort={onFetchPosts} />
        <Grid container wrap="wrap" justify="space-evenly" spacing={2}>
          {currentPosts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} lg={4} xl={3}>
              <PostCard {...post} />
            </Grid>
          ))}
        </Grid>
        <Box p={2} display="flex" justifyContent="flex-end">
          <Pagination
            color="secondary"
            count={pagesCount}
            page={currentPage}
            onChange={changePage}
          />
        </Box>
      </>
    );
  }

  return error ? <NotFound /> : frontPage;
};

export default Subreddit;
