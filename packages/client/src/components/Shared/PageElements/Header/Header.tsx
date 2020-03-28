import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// TODO: Add Mobile Support
export const HeaderComponent: FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" className="menu-bottom" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="title">
          <Link to="/">Eportal</Link>
        </Typography>

        <Link to="/gra">
          <Button>Rozpocznij Grę</Button>
        </Link>
        <Link to="/autentykacja">
          <Button>Logowanie/Rejestracja</Button>
        </Link>

      </Toolbar>
    </AppBar>
  );
};

export default memo(HeaderComponent);
