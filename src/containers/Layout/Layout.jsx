import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../../components/Header/Header';

const Layout = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#583c87',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  const appStyles = {
    backgroundColor: isDarkMode ? '#303030' : '#fcfffc',
    paddingTop: '90px',
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={appStyles}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            {props.routes}
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
