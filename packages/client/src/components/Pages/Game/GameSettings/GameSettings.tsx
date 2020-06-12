import React, { FC, memo, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import './GameSettings.scss';

import { SubmitEvent } from '../../../../models/typescript-events';

import AlertHandler from '../../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
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
import { useGameSettingsSelector } from './selector-hooks';

export const GameSettingComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const [isFormValid, setFormValidation] = useState<boolean>(false);
  const { cats, loading, error, alertType, defaults, userCanStartGame } = useGameSettingsSelector();

  const onSubmitHandler = (event: SubmitEvent): void => {
    event.preventDefault();
    dispatch(startGameHandler());
  };

  useEffect(() => {
    if (userCanStartGame) {
      dispatch(setGameStatus(GameStatus.Level1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCanStartGame]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,react-hooks/exhaustive-deps
  useEffect(() => () => dispatch(cleanIsReadyToGameData()), []);

  const errors = <AlertHandler error={error} type={alertType} />;

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
            <StartButton isFormValid={isFormValid} isLoading={loading} />
          </form>
        )}
      </PageContainer>
    </>
  );
};

export default memo(GameSettingComponent);
