import React, { FC, memo, useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {
  DeleteForever as DeleteIcon,
  SettingsBackupRestore as RestoreIcon,
} from '@material-ui/icons';

import { a11yProps, TabPanel } from '../../../utils/profile-settings';

export enum ProfileSettings {
  ChangePassword,
  DeleteAccount,
}

export const SettingsComponent: FC = () => {
  const [activeSetting, setActiveSetting] = useState<ProfileSettings>(
    ProfileSettings.ChangePassword,
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
            label="Change Password"
            {...a11yProps(ProfileSettings.ChangePassword)}
          />
          <Tab
            className="setting-switcher__tab"
            icon={<DeleteIcon />}
            label="Delete an Account"
            {...a11yProps(ProfileSettings.DeleteAccount)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeSetting} index={ProfileSettings.ChangePassword}>
        CHANGE PASSWORD
      </TabPanel>
      <TabPanel value={activeSetting} index={ProfileSettings.DeleteAccount}>
        DELETE ACCOUNT
      </TabPanel>
    </div>
  );
};

export default memo(SettingsComponent);
