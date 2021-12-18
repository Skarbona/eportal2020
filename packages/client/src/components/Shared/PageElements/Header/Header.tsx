import React, { FC, memo, useCallback, useState, KeyboardEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import './Header.scss';
import * as logoutThunk from '../../../../store/app/thunks/logout';
import { PageParams } from '../../../../models/page-types';
import { useReduxDispatch } from '../../../../store/helpers';
import { theme } from '../../../../settings/theme-settings';
import * as links from './links';
import { PORTAL_NAME } from '../../../../constants/envs';

interface Props {
  accessToken: string;
}

export const HeaderComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [isDrawerVisible, setDrawerVisibility] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const logoutHandler = useCallback(
    () => dispatch(logoutThunk.logout()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const game = links.GameLink(t('Play!'));
  const profile = links.ProfileLink(t('Profile'), isMobile);
  const logout = links.LogoutLink(t('Logout'), logoutHandler);
  const login = links.LoginLink(t('Log in'));
  const register = links.RegisterLink(t('Register'));
  const contact = links.ContactLink(t('Contact'));
  const waitingRoom = links.WaitingRoomLink(t('Waiting Room'));
  const itemsForMobileMenu = accessToken
    ? [waitingRoom, game, profile, contact, logout]
    : [login, register, contact];

  const toggleDrawer =
    (openDrawer: boolean) =>
    (event: KeyboardEvent | MouseEvent): void => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
      )
        return;

      setDrawerVisibility(openDrawer);
    };

  return (
    <AppBar position="static" className="header">
      {isMobile && (
        <Drawer open={isDrawerVisible} onClose={toggleDrawer(false)} className="header__drawer">
          <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {itemsForMobileMenu.map((el, index) => (
              <ListItem button key={index}>
                {el}
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            className="menu-bottom"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className="title">
          <Link to={PageParams.Home} className="portal-name">
            {PORTAL_NAME}
          </Link>
        </Typography>
        {accessToken && !isMobile && (
          <>
            {waitingRoom}
            {game}
            {profile}
          </>
        )}
        {!accessToken && !isMobile && (
          <>
            {login}
            {register}
          </>
        )}
        {!isMobile && contact}
        {accessToken && logout}
      </Toolbar>
    </AppBar>
  );
};

export default memo(
  HeaderComponent,
  (prevProps, nextProps) =>
    prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0,
);
