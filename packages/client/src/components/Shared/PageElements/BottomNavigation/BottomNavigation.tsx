import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import {
  AccountCircle as AccountIcon,
  SportsEsports as GameIcon,
  LockOpen as LoginIcon,
  Add as AddIcon,
  Home as HomeIcon,
} from '@material-ui/icons';

import './BottomNavigation.scss';
import { PageParams } from '../../../../models/page-types';

interface Props {
  accessToken: string;
}

export const BottomNavigationComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const [selectedItem, setItem] = useState<string>('/gra');
  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    setItem(pathname);
  }, [pathname]);

  const setItemHandler = useCallback((event, newValue) => {
    setItem(newValue);
  }, []);

  return (
    <BottomNavigation
      value={selectedItem}
      onChange={setItemHandler}
      showLabels
      className="main-bottom-navigation"
    >
      <BottomNavigationAction
        label={t('Home')}
        icon={<HomeIcon />}
        component={Link}
        to="/"
        value="/"
      />
      {accessToken && (
        <BottomNavigationAction
          label={t('Play!')}
          icon={<GameIcon />}
          component={Link}
          value="/gra"
          to="/gra"
        />
      )}
      {accessToken && (
        <BottomNavigationAction
          label={t('Profile')}
          icon={<AccountIcon />}
          component={Link}
          to="/profil"
          value="/profil"
        />
      )}

      {!accessToken && (
        <BottomNavigationAction
          label={t('Log in')}
          icon={<LoginIcon />}
          component={Link}
          to={`/autentykacja/${PageParams.Login as string}`}
          value={`/autentykacja/${PageParams.Login as string}`}
        />
      )}
      {!accessToken && (
        <BottomNavigationAction
          label={t('Register')}
          icon={<AddIcon />}
          component={Link}
          to={`/autentykacja/${PageParams.Register as string}`}
          value={`/autentykacja/${PageParams.Register as string}`}
        />
      )}
    </BottomNavigation>
  );
};

export default memo(
  BottomNavigationComponent,
  (prevProps, nextProps) =>
    prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0,
);
