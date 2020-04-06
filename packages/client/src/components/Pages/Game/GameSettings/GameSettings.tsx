import React, { FC, Fragment, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Grid } from '@material-ui/core';

import './GameSettings.scss';

import { ErrorTypes } from '../../../../models/errors';
import { RootState } from '../../../../store/store.interface';
import { SubmitEvent } from '../../../../models/typescript-events';
import { CategoriesStateInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import CircleLoading from '../../../Shared/UIElements/Loading/CircleLoading';
import DefaultSettings from './DefaultSettings';
import NumberOfTasksPerLevel from './NumberOfTasksPerLevel';
import Places from './Places';
import PlayersNames from './PlayersNames';
import Preferences from './Preferences';
import TimeForTask from './TimeForTask';
import StartButton from './StartButton';
import { startGameHandler } from '../../../../store/game/thunk';
import { useReduxDispatch } from '../../../../store/helpers';

export interface GameSettingStoreProps {
  cats: CategoriesStateInterface['categories'];
  loading: boolean;
  error: Error;
  errorType: ErrorTypes;
  defaults: FormValues;
}

export const GameSettingComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [isFormValid, setFormValidation] = useState<boolean>(false);
  const { cats, loading, error, errorType, defaults } = useSelector<
    RootState,
    GameSettingStoreProps
  >(({ categories, game, user, app }) => ({
    cats: categories.categories,
    loading: categories.loading || game.loading,
    error: categories.error || game.error || user.error,
    errorType: categories.errorType || game.errorType || user.errorType,
    defaults: user.userData.gameDefaults,
    accessToken: app.auth.accessToken,
  }));

  const onSubmitHandler = (event: SubmitEvent): void => {
    event.preventDefault();
    dispatch(startGameHandler());
  };

  const errors = <ErrorHandler error={error} type={errorType} />;

  return (
    <Fragment>
      {errors}
      {loading && <CircleLoading />}
      {defaults && cats && (
        <div className="game__settings">
          <form onSubmit={onSubmitHandler}>
            <Typography variant="h3" component="h1">
              {t('New Game')}
            </Typography>
            <Grid container direction="column">
              <PlayersNames defaults={defaults.names} />
              <Places places={cats.places} defaults={defaults.place} />
              <Preferences
                preferences={cats.preferences}
                setFormValidation={setFormValidation}
                defaults={defaults.catsQuery.catsInclude}
              />
              <NumberOfTasksPerLevel levels={cats.levels} defaults={defaults.levels} />
              <TimeForTask defaults={defaults.time} />
            </Grid>
            <DefaultSettings />
            {errors}
            <StartButton isFormValid={isFormValid} />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default memo(GameSettingComponent);
