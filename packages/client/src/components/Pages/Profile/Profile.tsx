import React, { FC, memo, Fragment } from 'react';

import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';

export const ProfileComponent: FC<{}> = () => {
  return (
    <Fragment>
      <PageHeading title="Profile" />
      <PageContainer className="profile">PROFILE CONTENT</PageContainer>
    </Fragment>
  );
};

export default memo(ProfileComponent);
