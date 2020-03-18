import React, { FC, memo } from 'react';

import Profile from './Profile/Profile';

// TODO: Add lazy loading for pages
// TODO: Add routing for pages
export const Component: FC<{}> = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default memo(Component);
