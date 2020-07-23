import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Panel from '../../components/Panel/Panel';
import PostGrid from '../PostGrid/PostGrid';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions/posts';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';

export class FrontPage extends Component {
  componentDidMount() {
    if (this.props.match) {
      let url = this.props.match.params.subreddit
      if (url) {
        this.props.onFetchPosts(url, 'hot')
      } else {
        this.props.onFetchPosts('all', 'hot')
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.url !== prevProps.match.url) {
      let url = this.props.match.params.subreddit
      if (url) {
        this.props.onFetchPosts(url, 'hot')
      } else {
        this.props.onFetchPosts('all', 'hot')
      }
    }
  }


  render() {
    let frontPage = <Spinner />
    if (!this.props.loading) {
      frontPage = (
        <>
          <Panel subredditName={this.props.subreddit} />
          <PostGrid posts={this.props.posts} />
        </>
      )
    }

    return (
      <Grid item container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {this.props.error? <NotFound /> : frontPage}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    )
  }
}
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  subreddit: state.posts.subredditName,
  loading: state.posts.loading,
  error: state.posts.error
})

const mapDispatchToProps = (dispatch) => ({
  onFetchPosts: (subredditName, sortBy) => dispatch(fetchPosts(subredditName, sortBy))
})


export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);