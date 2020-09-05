import React from 'react';
import { Typography, Button, ButtonGroup, Grid, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const Panel = (props) => {
  const subredditName = useSelector((state) => state.posts.subredditName);
  const subredditInfo = useSelector((state) => state.posts.subredditInfo);
  const currentSortButton = useSelector((state) => state.posts.sortBy);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <div>
            <Typography color="textPrimary" variant="h3" component="h1">
              {subredditInfo.title}
            </Typography>
            <Typography color="textSecondary" variant="body1" component="p">
              {subredditInfo.display_name_prefixed}
            </Typography>
            <Typography color="textSecondary" variant="h6" component="p">
              {subredditInfo.public_description}
            </Typography>
          </div>
        </Grid>
        <Grid item container md={4} justify="space-evenly">
          <img src={subredditInfo.icon_img} alt={subredditInfo.icon_img} />
        </Grid>
      </Grid>
      <Box paddingBottom={3}>
        <Box margin="5px 0" color="text.secondary" fontSize="0.9rem">
          sort posts by:
        </Box>
        <ButtonGroup
          color="secondary"
          aria-label="outlined primary button group"
        >
          {['hot', 'top', 'new', 'controversial'].map((sortButton) => (
            <Button
              key={sortButton}
              variant={
                currentSortButton === sortButton ? 'contained' : 'outlined'
              }
              onClick={() => props.sort(subredditName, sortButton)}
            >
              {sortButton}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Panel;
