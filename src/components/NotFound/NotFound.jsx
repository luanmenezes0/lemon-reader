import React from 'react';
import { Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const NotFound = () => {
  return (
    <Alert severity="info">
      Not Found. Are you sure you typed correctly?{' '}
      <Link underline="hover" href="/">
        Take me back to the front page!
      </Link>
    </Alert>
  );
};

export default NotFound;
