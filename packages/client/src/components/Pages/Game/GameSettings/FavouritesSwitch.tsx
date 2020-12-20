import React, { FC, memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, FormControlLabel, FormGroup, Grid, Switch } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export const FavouritesSwitchComponent: FC<Props> = ({ onlyFavourites }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [switchState, setSwitchState] = useState<boolean>(onlyFavourites);
  const setSwitchStateHandler = (): void => setSwitchState((prevState) => !prevState);

  useEffect(() => {
    const payload: Partial<FormValues> = {
      onlyFavourites: switchState,
    };
    dispatch(setFormValues(payload));
  }, [switchState, dispatch]);

  return (
    <Grid container className="prefer-favourites">
      <FormGroup>
        <FormControlLabel
          color="primary"
          className="primary-checkbox"
          control={
            <Switch
              id="prefer-favourites"
              checked={switchState}
              onChange={setSwitchStateHandler}
              color="primary"
            />
          }
          label={!switchState ? t('Prefer favourite tasks') : t('Try go get only favourite tasks')}
        />
        <Typography variant="caption" color="primary" className="extra-info">
          <InfoOutlined fontSize="small" />{' '}
          {!switchState
            ? t('The probability of selecting the 60')
            : t('The probability of selecting the 100')}{' '}
          {t('General info about favourite option')}
        </Typography>
      </FormGroup>
    </Grid>
  );
};

interface Props {
  onlyFavourites: boolean;
}

export default memo(FavouritesSwitchComponent);
