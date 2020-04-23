import React, { FC, memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import './GameSettings.scss';

import { ErrorTypes } from '../../../../models/errors';
import { RootState } from '../../../../store/store.interface';
import { SubmitEvent } from '../../../../models/typescript-events';
import { CategoriesStateInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import CircleLoading from '../../../Shared/UIElements/Loading/CircleLoading';
import PageHeading from '../../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../Shared/PageElements/PageContainer/PageContainer';
import DefaultSettings from './DefaultSettings';
import NumberOfTasksPerLevel from './NumberOfTasksPerLevel';
import Places from './Places';
import PlayersNames from './PlayersNames';
import Preferences from './Preferences';
import TimeForTask from './TimeForTask';
import StartButton from './StartButton';
import GameStartDialog from './GameStartDialog/GameStartDialog';
import { cleanIsReadyToGameData } from '../../../../store/game/action';
import { startGameHandler } from '../../../../store/game/thunks/startGame';
import { useReduxDispatch } from '../../../../store/helpers';
import { setGameStatus } from '../../../../store/game/thunks/setGameStatus';
import { GameStatus } from '../../../../models/game-models';

export interface GameSettingStoreProps {
  cats: CategoriesStateInterface['categories'];
  loading: boolean;
  error: Error;
  errorType: ErrorTypes;
  defaults: FormValues;
  userCanStartGame: boolean;
}

export const GameSettingComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const [isFormValid, setFormValidation] = useState<boolean>(false);
  const { cats, loading, error, errorType, defaults, userCanStartGame } = useSelector<
    RootState,
    GameSettingStoreProps
  >(({ categories, game, user, app }) => ({
    cats: categories.categories,
    loading: categories.loading || game.loading,
    error: categories.error || game.error || user.error,
    errorType: categories.errorType || game.errorType || user.errorType,
    defaults: user.userData.gameDefaults,
    accessToken: app.auth.accessToken,
    userCanStartGame: game.isReadyToStartGame?.hasEnough,
  }));

  const onSubmitHandler = (event: SubmitEvent): void => {
    event.preventDefault();
    dispatch(startGameHandler());
  };

  useEffect(() => {
    if (userCanStartGame) {
      dispatch(setGameStatus(GameStatus.Level1));
    }
  }, [userCanStartGame, dispatch]);

  useEffect(() => () => dispatch(cleanIsReadyToGameData()), [dispatch]);

  const errors = <ErrorHandler error={error} type={errorType} />;

  return (
    <>
      <GameStartDialog />
      <PageHeading title="New Game" />
      <PageContainer className="game__settings">
        {errors}
        {loading && <CircleLoading />}
        {defaults && cats && (
          <form onSubmit={onSubmitHandler}>
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
        )}
      </PageContainer>
    </>
  );
};

export default memo(GameSettingComponent);
