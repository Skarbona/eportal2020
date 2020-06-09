import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AccountCircle as AccountIcon,
  SportsEsports as GameIcon,
  LockOpen as LoginIcon,
  Add as AddIcon,
  Email as EmailIcon,
} from '@material-ui/icons';

import './BottomNavigation.scss';
import { setContactFormVisibility } from '../../../../store/app/action';
import { PageParams } from '../../../../models/page-types';

interface Props {
  accessToken: string;
}

export const BottomNavigationComponent: FC<Props> = ({ accessToken }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
      {accessToken && (
        <BottomNavigationAction
          label={t('Play!')}
          icon={<GameIcon />}
          component={Link}
          value={PageParams.Game}
          to={PageParams.Game}
        />
      )}
      {accessToken && (
        <BottomNavigationAction
          label={t('Profile')}
          icon={<AccountIcon />}
          component={Link}
          to={PageParams.Profile}
          value={PageParams.Profile}
        />
      )}

      {!accessToken && (
        <BottomNavigationAction
          label={t('Log in')}
          icon={<LoginIcon />}
          component={Link}
          to={PageParams.Login}
          value={PageParams.Login}
        />
      )}
      {!accessToken && (
        <BottomNavigationAction
          label={t('Register')}
          icon={<AddIcon />}
          component={Link}
          to={PageParams.Register}
          value={PageParams.Register}
        />
      )}
      <BottomNavigationAction
        label={t('Contact')}
        icon={<EmailIcon />}
        onClick={() => dispatch(setContactFormVisibility(true))}
      />
    </BottomNavigation>
  );
};

export default memo(
  BottomNavigationComponent,
  (prevProps, nextProps) =>
    prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0,
);
