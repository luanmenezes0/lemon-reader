import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styles from "./Comment.module.css";
import { convertTimestamp } from "../../shared/utility";

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
      <Card className={styles.CommentCard} onClick={() => toggleComments()}>
        <CardContent className={styles.Comment}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <span className={styles.UserName}>{author}</span>{" "}
            <span className={styles.CommentPoints}>{score} points </span>
            {convertTimestamp(created_utc)} hours ago
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>

      {isToggled
        ? commentReplies.map((reply) => (
            <Card className={styles.Reply} key={reply.data.id}>
              <CardContent className={styles.Comment}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <span className={styles.userName}>{reply.data.author}</span>{" "}
                  <span style={{ color: "#9778ce" }}>
                    {reply.data.score} points{" "}
                  </span>
                  {convertTimestamp(reply.data.created_utc)} hours ago
                </Typography>
                {reply.data.body}
              </CardContent>
            </Card>
          ))
        : null}
    </>
  );
};

export default Comment;
