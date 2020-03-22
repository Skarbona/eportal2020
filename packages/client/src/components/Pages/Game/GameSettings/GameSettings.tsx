import React, { FC, Fragment, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import './GameSettings.scss';

import { PageTypes } from '../../../../models/pageTypes';
import { RootState } from '../../../../store/store.interface';
import { GameSettingStoreProps } from '../Game.interface';

import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import CircleLoading from '../../../Shared/UIElements/Loading/CircleLoading';
import DefaultSettings from './DefaultSettings';
import NumberOfTasksPerLevel from './NumberOfTasksPerLevel';
import Places from './Places';
import PlayersNames from './PlayersNames';
import Preferences from './Preferences';
import TimeForTask from './TimeForTask';
import StartButton from './StartButton';
import { SubmitEvent } from '../../../../models/typescript-events';
import { startGameHandler } from '../../../../store/game/thunk';
import { useReduxDispatch } from '../../../../store/helpers';

export const GameSettingComponent: FC<{}> = () => {
  const dispatch = useReduxDispatch();
  const [isFormValid, setFormValidation] = useState<boolean>(false);
  const { cats, loading, error } = useSelector<RootState, GameSettingStoreProps>(
    ({ categories }) => ({
      cats: categories.categories,
      loading: categories.loading,
      error: categories.error,
    }),
  );

  const onSubmitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    dispatch(startGameHandler());
  };

  if (loading) return <CircleLoading />;

  return (
    <Fragment>
      <ErrorHandler error={error} type={PageTypes.CategorySettings} />
      {!error && (
        <div className="game__settings">
          <form onSubmit={onSubmitHandler}>
            <Typography variant="h3" component="h1">
              Nowa Gra
            </Typography>
            <PlayersNames />
            <Places places={cats.places} />
            <Preferences preferences={cats.preferences} setFormValidation={setFormValidation} />
            <NumberOfTasksPerLevel levels={cats.levels} />
            <TimeForTask />
            <DefaultSettings />
            <StartButton isFormValid={isFormValid} />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default memo(GameSettingComponent);
