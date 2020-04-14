import React, { FC, memo, useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {
  DeleteForever as DeleteIcon,
  SettingsBackupRestore as RestoreIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { a11yProps, TabPanel, ProfileSettings } from '../../../../utils/profile-settings';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

export const SettingsComponent: FC = () => {
  const { t } = useTranslation();
  const [activeSetting, setActiveSetting] = useState<ProfileSettings>(
    ProfileSettings.ChangePassword,
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
    setActiveSetting(newValue);
  };

  return (
    <div className="profile__settings">
      <AppBar position="static" className="setting-switcher">
        <Tabs
          value={activeSetting}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            className="setting-switcher__tab"
            icon={<RestoreIcon />}
            label={t('Change password')}
            {...a11yProps(ProfileSettings.ChangePassword)}
          />
          <Tab
            className="setting-switcher__tab"
            icon={<DeleteIcon />}
            label={t('Delete an Account')}
            {...a11yProps(ProfileSettings.DeleteAccount)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeSetting} index={ProfileSettings.ChangePassword}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={activeSetting} index={ProfileSettings.DeleteAccount}>
        <DeleteAccount />
      </TabPanel>
    </div>
  );
};

export default memo(SettingsComponent);
