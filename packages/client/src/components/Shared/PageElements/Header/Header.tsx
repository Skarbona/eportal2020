import React, { FC, memo, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../context/auth-context';

import './Header.scss';

// TODO: Add Mobile Support
export const HeaderComponent: FC = () => {
  const { t } = useTranslation();
  const { logout, token } = useContext(AuthContext);

  // TODO: Full Logout support (clean store)

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" className="menu-bottom" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          <Link to="/">{t('Portal Name')}</Link>
        </Typography>
        {token && (
          <Fragment>
            <Link to="/gra">
              <Button>{t('Start a Game!')}</Button>
            </Link>
            <Link to="/" onClick={logout}>
              <Button>{t('Logout')}</Button>
            </Link>
          </Fragment>
        )}
        {!token && (
          <Link to="/autentykacja">
            <Button>{t('Register')}</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(HeaderComponent);
