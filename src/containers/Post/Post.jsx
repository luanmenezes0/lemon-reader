import React, { useEffect, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/comments/actions";
import { convertTimestamp } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Comment from "../../components/Comment/Comment";
import PostMedia from "../../components/PostCard/PostMedia/PostMedia";

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
        <article>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h4">{postData.title}</Typography>
              <Typography variant="body1">by {postData.author}</Typography>
              <Typography variant="body1">
                {" "}
                {postData.subreddit_name_prefixed}
              </Typography>
              <Typography variant="body1">
                {" "}
                {convertTimestamp(postData.created_utc)} hours ago{" "}
              </Typography>
              <Typography variant="body1">
                {" "}
                {postData.num_comments} comments{" "}
              </Typography>
              <Typography variant="body1"> {postData.score} points </Typography>
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
        </article>
        <hr />

        {commentData.map((comment) => (
          <Comment {...comment.data} key={comment.data.id} />
        ))}
      </>
    );
  }

  if (error) {
    post = <Typography variant="body1">{error.message}</Typography>;
  }
  return (
    <Grid item container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        {post}
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default Post;
