import React, { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { AccountCircle as AccountIcon, Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import './Header.scss';
import { logout } from '../../../../store/app/thunks/logout';
import { PageParams } from '../../../../models/page-types';
import { useReduxDispatch } from '../../../../store/helpers';
import { theme } from '../../../../settings/theme-settings';

interface Props {
  accessToken: string;
}

export const HeaderComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const logoutHandler = useCallback(
    () => dispatch(logout()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" className="menu-bottom" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className="title">
          <Link to={PageParams.Home} className="portal-name">
            {process.env.REACT_APP_PORTAL_NAME}
          </Link>
        </Typography>
        {accessToken && !isMobile && (
          <>
            <Link to={PageParams.Game} className="btn__start-game">
              <Button>{t('Play!')}</Button>
            </Link>
            <Link to={PageParams.Profile} className="btn__profile-page">
              <IconButton>
                <AccountIcon color="inherit" />
              </IconButton>
            </Link>
          </>
        )}
        {accessToken && (
          <Link to={PageParams.Home} onClick={logoutHandler} className="btn__logout">
            <Button>{t('Logout')}</Button>
          </Link>
        )}
        {!accessToken && (
          <>
            <Link to={PageParams.Login} className="btn__log-in">
              <Button>{t('Log in')}</Button>
            </Link>
            <Link to={PageParams.Register} className="btn__register">
              <Button>{t('Register')}</Button>
            </Link>
          </>
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
