import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { truncateString } from '../../shared/utility';
import mascot from '../../assets/mascot.png';

const useStyles = makeStyles({
  root: {
    maxWidth: '360px',
    minWidth: '270px',
    height: '300px',
    margin: '5px 0',
    borderRadius: '5px',
  },
  action: {
    position: 'sticky',
    bottom: '0px',
  },
});

const SubredditCard = (props) => {
  const classes = useStyles();

  const {
    display_name_prefixed,
    public_description,
    description,
    icon_img,
    url,
  } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={icon_img ? icon_img : mascot}
          title={display_name_prefixed}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {display_name_prefixed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {public_description
              ? truncateString(public_description, 90)
              : truncateString(description, 90)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button color="primary">
          <Link to={url}>Explore</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubredditCard;
