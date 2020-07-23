import React from 'react';
import PostCard from '../../components/PostCard/PostCard';
import { Grid } from '@material-ui/core';

const PostGrid = (props) => {
  return (
    <Grid container spacing={3}>
      {props.posts.map((post) => (
        <Grid item xs={12} key={post.data.id}>
          <PostCard
            title={post.data.title}
            url={post.data.subreddit}
            postId={post.data.id}
            author={post.data.author}
            thumbnail={post.data.thumbnail}
            upvotes={post.data.score}
            subName={post.data.subreddit}
            gilded={post.data.gilded}
            creationTime={post.data.created_utc}
            numComments={post.data.num_comments}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostGrid;
