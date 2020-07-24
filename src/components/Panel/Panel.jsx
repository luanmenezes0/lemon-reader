import React, { Component } from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { connect } from "react-redux";
import { sortPosts } from "../../store/actions/posts";
import styles from "./Panel.module.css";

export class Panel extends Component {
  sortedPostsHandler = (sort) => {
    this.props.onSortPosts(this.props.subredditName, sort);
  };

  render() {
    let banner;
    if (this.props.subredditName === "all") {
      banner = (
        <>
          <Typography variant="h2">Welcome to the Front Page!</Typography>
          <Typography variant="h6">
            Search for a community or just browse for the most popular posts of
            the day
          </Typography>
        </>
      );
    } else {
      banner = (
        <>
          <Typography variant="h2">{this.props.subTitle}</Typography>
          <Typography variant="body1">{this.props.subname}</Typography>
          <Typography variant="h6">{this.props.subDescription}</Typography>
          <img src={this.props.icon_img} alt={this.props.icon_img} />
        </>
      );
    }
    return (
      <>
        <div className={styles.SubredditBanner}>
          {banner}
          <hr />
        </div>

        <div className={styles.SortArea}>
          <Typography variant="body1">sort by: </Typography>
          <ButtonGroup
            color="secondary"
            aria-label="outlined primary button group"
          >
            {["hot", "top", "new", "controversial"].map((sortButton) => (
              <Button
                key={sortButton}
                variant={
                  this.props.sortBy === sortButton ? "contained" : "outlined"
                }
                onClick={() => this.sortedPostsHandler(sortButton)}
              >
                {sortButton}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subreddit: state.posts.subredditName,
  sortBy: state.posts.sortBy,
  subTitle: state.posts.subredditInfo.title,
  subDescription: state.posts.subredditInfo.public_description,
  subname: state.posts.subredditInfo.display_name_prefixed,
});

const mapDispatchToProps = (dispatch) => ({
  onSortPosts: (subredditName, selectedFilter) =>
    dispatch(sortPosts(subredditName, selectedFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
