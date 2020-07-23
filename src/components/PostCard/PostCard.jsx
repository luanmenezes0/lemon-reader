import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  IconButton,
  Icon,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StarIcon from "@material-ui/icons/Star";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { Link, withRouter } from "react-router-dom";
import { convertTimestamp } from '../../shared/utility';

const useStyles = makeStyles((theme) => ({
  media: {
    height: "110px",
    width: "110px",
  },
  scoreArea: {
    backgroundColor: "#F7FAEF",
  },
  postScore: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  goldAwardIcon: {
    color: "yellow",
  },
}));


const PostCard = (props) => {
  const classes = useStyles();

  let gildedPost = null;
  if (props.gilded) {
    gildedPost = (
      <Icon>
        <StarIcon className={classes.goldAwardIcon} />
      </Icon>
    );
  }

  return (
    <Card style={{ border: 'solid 1px #F7FAEF', marginTop: '5px' }}>
      <Grid container>
        <Grid item xs={1} className={classes.scoreArea}>
          <CardContent>
            <CardActions className={classes.postScore}>
              <IconButton>
                <ThumbUpAltIcon />
              </IconButton>
              <Typography variant="caption">{props.upvotes}</Typography>
              <IconButton>
                <ThumbDownAltIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Grid>

        <Grid item xs={9}>
          <CardContent>
            <Typography variant="h6">{props.title}</Typography>
            <Typography variant="body2">
              to <span style={{ color: 'purple' }}>r/<Link to={`${props.subName}`} >{props.url}</Link></span> by {props.author}
              {gildedPost}
            </Typography>

            <Typography variant="body2">
              {convertTimestamp(props.creationTime)} hours ago
            </Typography>
            <Button onClick={() => props.history.push(`${props.subName}/comments/${props.postId}`)}>
              {props.numComments} comments
            </Button>
          </CardContent>
        </Grid>

        <Grid item xs={2}>
          <CardContent>
            {props.thumbnail ?
              <CardMedia
                className={classes.media}
                image={props.thumbnail}
                title={props.title}
              />
              : null}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withRouter(PostCard);
