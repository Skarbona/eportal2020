import React, { FC, memo, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Add as AddIcon, Description as PostIcons } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { fetchUserPosts } from '../../../store/user/thunks/fetchUserPosts';
import { useReduxDispatch } from '../../../store/helpers';
import { RootState } from '../../../store/store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { PostStatus } from '../../../models/posts';
import { PageParams } from '../../../models/page-types';

interface Props {
  name: string;
  email: string;
  userId: string;
}

export const CardInfoComponent: FC<Props> = ({ name, email, userId }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const history = useHistory();
  const { userPosts } = useSelector<RootState, { userPosts: PostResponseInterface[] }>(
    ({ user }) => ({
      userPosts: user.userPosts,
    }),
  );

  useEffect(() => {
    dispatch(fetchUserPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-user">
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {email}
          </Typography>
        </CardContent>
      </Card>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-actions default-cursor">
          <Button>
            <span className="counter">{userPosts?.length}</span>
            <span className="text">{t('Added Tasks')}</span>
          </Button>
          <Button>
            <span className="counter">
              {userPosts?.filter((post) => post.status === PostStatus.Publish).length}
            </span>
            <span className="text">{t('Approved Tasks')}</span>
          </Button>
        </CardContent>
      </Card>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-user">
          <Button
            onClick={(): void =>
              history.push(
                `${PageParams.Posts}/1/?author=${userId}&status=${PostStatus.AwaitingForApproval},${PostStatus.Publish},${PostStatus.Archival}`,
              )
            }
            fullWidth
            className="success-button"
            variant="contained"
            startIcon={<PostIcons />}
          >
            {t('See your posts')}
          </Button>
        </CardContent>
      </Card>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-user">
          <Button
            onClick={(): void => history.push(`${PageParams.WaitingRoom}/1`)}
            fullWidth
            className="success-button"
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t('Add post')}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(CardInfoComponent);
