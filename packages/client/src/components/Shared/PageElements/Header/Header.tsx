import React, { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle as AccountIcon, Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { logout } from '../../../../store/app/thunks/logout';
import './Header.scss';
import { PageParams } from '../../../../models/page-types';
import { useReduxDispatch } from '../../../../store/helpers';

import { RootState } from '../../../../store/store.interface';
import { GameStatus } from '../../../../models/game-models';

interface Props {
  accessToken: string;
}

interface SelectorProps {
  gameStatus: GameStatus;
}

// TODO: Add Mobile Support
export const HeaderComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { gameStatus } = useSelector<RootState, SelectorProps>(({ game }) => ({
    gameStatus: game.gameStatus,
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
          <>
            <Link to="/gra" className="btn__start-game">
              <Button>{gameStatus === GameStatus.NewGame ? t('Start a Game!') : t('Play!')}</Button>
            </Link>
            <Link to="/" onClick={logoutHandler} className="btn__logout">
              <Button>{t('Logout')}</Button>
            </Link>
            <Link to="/profil" className="btn__profile-page">
              <IconButton>
                <AccountIcon color="inherit" />
              </IconButton>
            </Link>
          </>
        )}
        {!accessToken && (
          <>
            <Link to={`/autentykacja/${PageParams.Login as string}`} className="btn__log-in">
              <Button>{t('Log in')}</Button>
            </Link>
            <Link to={`/autentykacja/${PageParams.Register as string}`} className="btn__register">
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
