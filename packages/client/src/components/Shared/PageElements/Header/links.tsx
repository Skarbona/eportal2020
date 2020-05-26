import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { AccountCircle as AccountIcon } from '@material-ui/icons';

import { PageParams } from '../../../../models/page-types';

export const GameLink = (text: string): ReactNode => (
  <Link to={PageParams.Game} className="btn__start-game">
    <Button>{text}</Button>
  </Link>
);

export const ProfileLink = (text: string, isMobile: boolean): ReactNode => (
  <Link to={PageParams.Profile} className="btn__profile-page">
    {isMobile ? (
      <Button>{text}</Button>
    ) : (
      <IconButton>
        <AccountIcon color="inherit" />
      </IconButton>
    )}
  </Link>
);

export const LogoutLink = (text: string, logoutHandler: () => void): ReactNode => (
  <Link to={PageParams.Home} onClick={logoutHandler} className="btn__logout">
    <Button>{text}</Button>
  </Link>
);

export const LoginLink = (text: string): ReactNode => (
  <Link to={PageParams.Login} className="btn__log-in">
    <Button>{text}</Button>
  </Link>
);

export const RegisterLink = (text: string): ReactNode => (
  <Link to={PageParams.Register} className="btn__register">
    <Button>{text}</Button>
  </Link>
);
