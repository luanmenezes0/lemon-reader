import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Icon,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StarIcon from "@material-ui/icons/Star";
import { Link, withRouter } from "react-router-dom";
import { convertTimestamp, truncateString } from "../../shared/utility";
import mascot from "../../assets/mascot.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "350px",
    margin: "5px 0",
    borderRadius: "5px",
  },
  title: { fontWeight: "500" },
  badge: {
    backgroundColor: "#583c87",
    padding: "1px 4px",
    borderRadius: "5px",
    color: "white",
    fontSize: "0.9rem",
    display: "inline-block",
    boxSizing: "border-box",
    marginBottom: "10px",
    marginRight: "6px",
  },
  goldAwardIcon: {
    color: "yellow",
    fontSize: "1rem",
  },
  linkButtom: {
    color: "#583c87",
  },
  nsfw: {
    backgroundColor: "red",
    padding: "1px 4px",
    borderRadius: "5px",
    color: "white",
    fontSize: "0.9rem",
    display: "inline-block",
    boxSizing: "border-box",
    marginBottom: "10px",
  },
}));

const PostCard = (props) => {
  const {
    gilded,
    thumbnail,
    title,
    subName,
    subreddit_name_prefixed,
    score,
    created_utc,
    history,
    id,
    over_18,
    location,
  } = props;
  const classes = useStyles();

  const postImage = (thumbnail) => {
    if (thumbnail === "default") {
      return mascot;
    }
    if (thumbnail === "self") {
      return mascot;
    }
    return thumbnail;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={postImage(thumbnail)}
          title={title}
        />
        <CardContent>
          <span className={classes.badge}>
            <Link to={`${subName}`}>{subreddit_name_prefixed}</Link>
          </span>
          {over_18 ? <span className={classes.nsfw}>nsfw</span> : null}
          {gilded ? (
            <Icon
              style={{
                height: "1rem",
                width: "1rem",
                fontSize: "1rem",
                marginLeft: "3px",
              }}
            >
              <StarIcon className={classes.goldAwardIcon} />
            </Icon>
          ) : null}
          <Typography className={classes.title} variant="body1" gutterBottom>
            {truncateString(title, 80)}
          </Typography>
          <Typography color="textSecondary" variant="caption" component="p">
            {score} points
            {" • "}
            {convertTimestamp(created_utc)} hours ago
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          className={classes.linkButtom}
          onClick={() => history.push(`${location.pathname}comments/${id}`)}
        >
          GO TO COMMENTS
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(PostCard);
