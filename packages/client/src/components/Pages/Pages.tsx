import React, { FC, memo, Fragment } from 'react';

import Game from './Game/Game';

// TODO: Add lazy loading for pages
// TODO: Add routing for pages
export const ProfileComponent: FC<{}> = () => {
  return (
    <Fragment>
      <Game />
    </Fragment>
  );
};

export default memo(ProfileComponent);
