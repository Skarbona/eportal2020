import React, { FC, memo, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTranslation } from 'react-i18next';

import { logout } from '../../../../store/app/thunk';
import './Header.scss';
import { PageParams } from '../../../../models/page-types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.interface';
import { useReduxDispatch } from '../../../../store/helpers';

// TODO: Add Mobile Support
export const HeaderComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { accessToken } = useSelector<RootState, { accessToken: string }>(({ app: { auth } }) => ({
    accessToken: auth.accessToken,
  }));

  const logoutHandler = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" className="menu-bottom" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          <Link to="/">{t('Portal Name')}</Link>
        </Typography>
        {accessToken && (
          <Fragment>
            <Link to="/gra">
              <Button>{t('Start a Game!')}</Button>
            </Link>
            <Link to="/" onClick={logoutHandler}>
              <Button>{t('Logout')}</Button>
            </Link>
          </Fragment>
        )}
        {!accessToken && (
          <Fragment>
            <Link to={`/autentykacja/${PageParams.Login}`}>
              <Button>{t('Log in')}</Button>
            </Link>
            <Link to={`/autentykacja/${PageParams.Register}`}>
              <Button>{t('Register')}</Button>
            </Link>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(HeaderComponent);
