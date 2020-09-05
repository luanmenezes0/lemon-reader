import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { format } from 'timeago.js';
import styles from './Comment.module.css';

export const Comment = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);
  const { replies, author, score, created_utc, body } = props;

  const toggleComments = () => {
    if (replies.data) {
      setIsToggled(!isToggled);
      setCommentReplies(replies.data.children);
    }
  };

  return (
    <>
      <Card className={styles.CommentCard} onClick={toggleComments}>
        <CardContent className={styles.Comment}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <span className={styles.UserName}>{author}</span>{' '}
            <span className={styles.CommentPoints}>{score} points</span>{' '}
            <span>{format(created_utc * 1000)}</span>
          </Typography>
          <Typography color="textPrimary" variant="body1">
            {body}
          </Typography>
        </CardContent>
      </Card>

      {isToggled
        ? commentReplies
            .filter((reply) => reply.kind === 't1')
            .map((reply) => (
              <Card className={styles.Reply} key={reply.data.id}>
                <CardContent className={styles.Comment}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className={styles.UserName}>{reply.data.author}</span>{' '}
                    <span className={styles.CommentPoints}>
                      {' '}
                      {reply.data.score} points
                    </span>{' '}
                    <span>{format(reply.data.created_utc * 1000)}</span>
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    {reply.data.body}
                  </Typography>
                </CardContent>
              </Card>
            ))
        : null}
    </>
  );
};

export default Comment;
