import React, { FC } from 'react';
import { Box } from '@material-ui/core';

export enum ProfileSettings {
  ChangePassword,
  DeleteAccount,
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: ProfileSettings;
  value: ProfileSettings;
}

export const a11yProps = (index: ProfileSettings): { id: string; 'aria-controls': string } => ({
  id: `scrollable-auto-tab-${index}`,
  'aria-controls': `scrollable-auto-tabpanel-${index}`,
});

export const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
    aria-labelledby={`scrollable-auto-tab-${index}`}
  >
    <Box p={3} className="primary-gradient-bg">
      {children}
    </Box>
  </div>
);
