import './Header.scss';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC, memo } from 'react';

// TODO: Add Mobile Support
export const HeaderComponent: FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" className="menu-bottom" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          Eportal
        </Typography>
        <Button>Login/Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default memo(HeaderComponent);
