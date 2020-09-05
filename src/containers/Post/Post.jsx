import React, { useEffect, useCallback } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { fetchComments } from '../../redux/comments/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Comment from '../../components/Comment/Comment';
import PostMedia from '../../components/PostCard/PostMedia/PostMedia';

export const Post = (props) => {
  const { match } = props;

  const dispatch = useDispatch();
  const onFetchComments = useCallback(
    (subredditName, postId) => dispatch(fetchComments(subredditName, postId)),
    [dispatch]
  );

  useEffect(() => {
    const subname = match.params.subreddit;
    const postId = match.params.postId;
    onFetchComments(subname, postId);
  }, [match, onFetchComments]);

  const postData = useSelector((state) => state.comments.postData);
  const commentData = useSelector((state) => state.comments.commentData);
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);

  let post = <Spinner />;
  if (!loading && commentData !== null) {
    post = (
      <>
        <Grid container spacing={2} component="article">
          <Grid item md={6}>
            <Typography color="textPrimary" variant="h5" component="h1">
              {postData.title}
            </Typography>
            <Typography color="textSecondary" variant="caption" component="p">
              by {postData.author}
            </Typography>
            <Typography color="textSecondary" variant="caption" component="p">
              {postData.subreddit_name_prefixed}
            </Typography>
            <Typography color="textSecondary" variant="caption" component="p">
              {format(postData.created_utc * 1000)}
            </Typography>
            <Typography color="textSecondary" variant="caption" component="p">
              {postData.num_comments} comments
            </Typography>
            <Typography color="textSecondary" variant="caption" component="p">
              {postData.score} points
            </Typography>
          </Grid>
          <Grid item md={6}>
            <PostMedia
              domain={postData.domain}
              desc={postData.title}
              type={postData.post_hint}
              source={postData.url}
            />
          </Grid>
        </Grid>
        <Divider />

        {commentData.map((comment) => (
          <Comment {...comment.data} key={comment.data.id} />
        ))}
      </>
    );
  }

  if (error) {
    post = <Alert severity="error">{error.message}</Alert>;
  }
  return post;
};

export default Post;
