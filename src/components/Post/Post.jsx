import React, { Component } from 'react';
import Spinner from '../UI/Spinner/Spinner';
import CommentsList from '../Comment/Comment';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchComments } from '../../store/actions/comments';
import { convertTimestamp } from '../../shared/utility';
import PostMedia from '../PostMedia/PostMedia';

export class Post extends Component {

  componentDidMount() {
    const subname = this.props.match.params.subreddit;
    const postId = this.props.match.params.postId;
    this.props.onFetchComments(subname, postId)
  }

  render() {
    let post = <Spinner />
    if (!this.props.loading && this.props.postComments !== null) {
      const postData = this.props.postComments[0].data.children[0].data;
      const commentsData = this.props.postComments[1].data.children.slice(0, 20);
      post = (
        <>
          <article>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h4">{postData.title}</Typography>
                <Typography variant="body1">by {postData.author}</Typography>
                <Typography variant="body1"> {postData.subreddit_name_prefixed}</Typography>
                <Typography variant="body1"> {convertTimestamp(postData.created_utc)} hours ago </Typography>
                <Typography variant="body1"> {postData.num_comments} comments </Typography>
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

          {commentsData.map((comment, index) => (
            <CommentsList
              idx={index}
              info={comment.data}
              key={comment.data.id}
            />
          )
          )}

        </>
      )
    } 
    
    
    if (this.props.error) {
      post = (
        <Typography variant="body1">{this.props.error.message}</Typography>
      )
    }
    return (
      <Grid item container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {post}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  postComments: state.comments.postData,
  loading: state.comments.loading,
  error: state.comments.error
})

const mapDispatchToProps = (dispatch) => ({
  onFetchComments: (subredditName, postId) => dispatch(fetchComments(subredditName, postId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Post);
