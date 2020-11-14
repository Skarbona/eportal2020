import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import './Profile.scss';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import CardInfo from './CardInfo';
import Settings from './Settings/Settings';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import { RootState } from '../../../store/store.interface';

export const ProfileComponent: FC = () => {
  const { name, email, id } = useSelector<RootState, ProfilePageSelectorProps>(({ user }) => ({
    name: user.userData.name,
    email: user.userData.email,
    id: user.userData.id,
  }));

  return (
    <>
      <PageHeading title="Profile" />
      <PageContainer className="profile">
        <Grid container spacing={2} className="profile__grid-container">
          <Grid item sm={12} md={5} className="profile__grid-item">
            {id && <CardInfo name={name} email={email} userId={id} />}
          </Grid>
          <Grid item sm={12} md={7} className="profile__grid-item">
            <Settings />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

interface ProfilePageSelectorProps {
  name: string;
  email: string;
  id: string;
}

export default memo(ProfileComponent);
