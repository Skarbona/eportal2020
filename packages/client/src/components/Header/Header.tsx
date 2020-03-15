import React, { FC, memo } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './Header.scss';

// TODO: Add Mobile Support
export const Header: FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" className="menu-bottom" aria-label="menu" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          Eportal
        </Typography>
        <Button color="inherit">Login/Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
