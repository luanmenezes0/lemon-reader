import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import styles from './Comment.module.css';
import { convertTimestamp } from '../../shared/utility';

export class Comment extends Component {
  state = {
    showReplies: false,
    innerComments: []
  }

  toggleComments = () => {
    if (this.props.info.replies.data) {
      this.setState(prevState => ({
        showReplies: !prevState.showReplies
      }));
      this.setState({ innerComments: this.props.info.replies.data.children })
    }
  }

  render() {
    return (
      <>
        <Card
          className={styles.CommentCard}
          onClick={() => this.toggleComments()}
        >
          <CardContent className={styles.Comment}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <span className={styles.UserName}>{this.props.info.author}</span> <span className={styles.CommentPoints}>{this.props.info.score} points </span>{convertTimestamp(this.props.info.created_utc)} hours ago
            </Typography>
            <Typography variant="body1">
              {this.props.info.body}
            </Typography>
          </CardContent>
        </Card>

        {this.state.showReplies ? this.state.innerComments.map((reply) => (
          <Card
            className={styles.Reply}
            key={reply.data.id}
          >
            <CardContent className={styles.Comment}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <span className={styles.userName}>{reply.data.author}</span> <span style={{ color: '#9778ce' }}>{reply.data.score} points </span>{convertTimestamp(reply.data.created_utc)} hours ago
              </Typography>
              {reply.data.body}
            </CardContent>
          </Card>
        )) : null}
      </>
    )
  }
}

export default Comment;
