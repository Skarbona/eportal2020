import React, { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AccountCircle as AccountIcon } from '@material-ui/icons';

import { setContactFormVisibility } from '../../../../store/app/action';
import { PageParams } from '../../../../models/page-types';

export const WaitingRoomLink = (text: string): ReactNode => (
  <Link to={`${PageParams.WaitingRoom}/1`} className="btn__waiting-room">
    <Button>{text}</Button>
  </Link>
);

export const GameLink = (text: string): ReactNode => (
  <Link to={PageParams.Game} className="btn__start-game">
    <Button>{text}</Button>
  </Link>
);

export const PremiumLink = (text: string): ReactNode => (
  <Link to={PageParams.PremiumPayment} className="btn__premium-page">
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

export const ContactLink = (text: string): ReactNode => {
  const dispatch = useDispatch();
  const openContactHandler = useCallback(() => {
    dispatch(setContactFormVisibility(true));
  }, [dispatch]);
  return <Button onClick={openContactHandler}>{text}</Button>;
};
