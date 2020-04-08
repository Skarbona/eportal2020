import React, { FC, memo, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTranslation } from 'react-i18next';

import { logout } from '../../../../store/app/thunks/logout';
import './Header.scss';
import { PageParams } from '../../../../models/page-types';
import { useReduxDispatch } from '../../../../store/helpers';

interface Props {
  accessToken: string;
}

// TODO: Add Mobile Support
export const HeaderComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();

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
            <Link to="/gra" className="btn__start-game">
              <Button>{t('Start a Game!')}</Button>
            </Link>
            <Link to="/" onClick={logoutHandler} className="btn__logout">
              <Button>{t('Logout')}</Button>
            </Link>
          </Fragment>
        )}
        {!accessToken && (
          <Fragment>
            <Link to={`/autentykacja/${PageParams.Login as string}`} className="btn__log-in">
              <Button>{t('Log in')}</Button>
            </Link>
            <Link to={`/autentykacja/${PageParams.Register as string}`} className="btn__register">
              <Button>{t('Register')}</Button>
            </Link>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(
  HeaderComponent,
  (prevProps, nextProps) =>
    prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0,
);
