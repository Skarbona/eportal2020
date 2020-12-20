import React, { FC, memo, useState, useCallback, useEffect } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { saveFavourites } from '../../../../store/user/thunks/saveFavourites';
import { useReduxDispatch } from '../../../../store/helpers';
import { RootState } from '../../../../store/store.interface';

export const FavouriteComponent: FC<Props> = ({ postId }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { favouritesPosts } = useSelector<RootState, { favouritesPosts: string[] }>(({ user }) => ({
    favouritesPosts: user.userData.favouritesPosts,
  }));

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    if (favouritesPosts?.length > 0 && postId) {
      setIsFavourite(!!favouritesPosts.find((id) => id === postId));
    }
  }, [favouritesPosts, postId]);

  const handleFavourite = useCallback(async () => {
    try {
      if (isFavourite) {
        setIsFavourite(false);
        await dispatch(saveFavourites(postId, true));
      } else {
        setIsFavourite(true);
        await dispatch(saveFavourites(postId));
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, [isFavourite, postId, dispatch]);

  return (
    <Tooltip title={isFavourite ? t('Remove favourites') : t('Add to favourites')}>
      <IconButton color="primary" size="medium" onClick={handleFavourite}>
        {isFavourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

interface Props {
  postId: string;
}

export default memo(FavouriteComponent);
