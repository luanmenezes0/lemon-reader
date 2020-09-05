import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  makeStyles,
  fade,
  Box,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Lemon from '../../assets/lemon.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: '100%',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const Header = (props) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const history = useHistory();
  const onSearchSubreddit = (e) => {
    e.preventDefault();
    history.replace(`${props.match.path}r/${inputValue}/`);
    setInputValue('');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Box height="1.8rem">
            <Link to="/">
              <img src={Lemon} alt="logo" className={classes.logo} />
            </Link>
          </Box>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/">Lemon Reader</Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={onSearchSubreddit}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={inputHandler}
                value={inputValue}
              />
            </form>
          </div>
          <IconButton onClick={() => props.setIsDarkMode(!props.isDarkMode)}>
            {props.isDarkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
