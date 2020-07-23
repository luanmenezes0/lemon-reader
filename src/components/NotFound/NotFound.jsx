import React from 'react'
import { Container, Typography, Link } from '@material-ui/core';

const NotFound = () => {

  return (
    <Container>
      <Typography align="center" variant="h4" gutterBottom>Not Found :(</Typography>
      <Typography align="center" variant="h6">Are you sure you typed correctly?</Typography>
      <Typography display="block" align="center" variant="button" style={{ paddingTop: '30px' }}>
        <Link underline="hover" href="/">Take me to the front page!</Link>
      </Typography>

    </Container>
  )
}

export default NotFound
