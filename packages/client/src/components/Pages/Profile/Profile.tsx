import React, { FC, memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import './Profile.scss';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import CardInfo from './CardInfo';
import Settings from './Settings/Settings';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import { RootState } from '../../../store/store.interface';

interface ProfilePageSelectorProps {
  name: string;
  email: string;
}

export const ProfileComponent: FC = () => {
  const { name, email } = useSelector<RootState, ProfilePageSelectorProps>(({ user }) => ({
    name: user.userData.name,
    email: user.userData.email,
  }));

  return (
    <Fragment>
      <PageHeading title="Profile" />
      <PageContainer className="profile">
        <Grid container spacing={2} className="profile__grid-container">
          <Grid item sm={12} md={5} className="profile__grid-item">
            <CardInfo name={name} email={email} />
          </Grid>
          <Grid item sm={12} md={7} className="profile__grid-item">
            <Settings />
          </Grid>
        </Grid>
      </PageContainer>
    </Fragment>
  );
};

export default memo(ProfileComponent);
