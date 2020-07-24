import React, { Component } from 'react';
import styles from './Header.module.css';
import { Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter, Link } from "react-router-dom";

class Header extends Component {

  submitHandler = (e) => {
    e.preventDefault()
    const selectedSub = e.target.value.toLowerCase()
    this.props.history.replace(selectedSub)
  }

  render() {
    return (
      <div className={styles.root} >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={styles.title} variant="h6" noWrap>
              <Link to="/r/">Lemon Reader</Link>
            </Typography>
            <div className={styles.search}>
              <form onSubmit={this.submitHandler}>
                <input
                  placeholder="Search…"
                  onChange={(e) => this.setState({ subName: e.target.value })}
                  className={styles.inputSearch}
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(Header);