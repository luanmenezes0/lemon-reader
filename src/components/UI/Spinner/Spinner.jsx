import React from 'react';
import styles from './Spinner.module.css';
import { Box } from '@material-ui/core';

const Spinner = () => {
  return (
    <Box height="100vh">
      <div className={styles.loader}>Loading...</div>
    </Box>
  );
};

export default Spinner;
