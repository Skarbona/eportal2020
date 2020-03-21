import React, { FC, memo, Fragment } from 'react';
import { useSelector } from 'react-redux';

import './GameSettings.scss';
import { RootState } from '../../../../store/store.interface';
import { GameSettingStoreProps } from '../Game.interface';
import { PageTypes } from '../../../../models/pageTypes';
import CircleLoading from '../../../Shared/UIElements/Loading/CircleLoading';
import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import Preferences from './Preferences';
import PlayersNames from './PlayersNames';
import NumberOfTasksPerLevel from './NumberOfTasksPerLevel';
import Places from './Places';
import TimeForTask from './TimeForTask';
import DefaultSettings from './DefaultSettings';

export const GameSettingComponent: FC<{}> = () => {
  const { cats, loading, error } = useSelector<RootState, GameSettingStoreProps>(
    ({ categories }) => ({
      cats: categories.categories,
      loading: categories.loading,
      error: categories.error,
    }),
  );

  if (loading) return <CircleLoading />;

  return (
    <Fragment>
      <ErrorHandler error={error} type={PageTypes.CategorySettings} />
      {!error && (
        <div className="game__settings">
          <PlayersNames />
          <Places places={cats.places} />
          <Preferences preferences={cats.preferences} />
          <NumberOfTasksPerLevel levels={cats.levels} />
          <TimeForTask />
          <DefaultSettings />
        </div>
      )}
    </Fragment>
  );
};

export default memo(GameSettingComponent);
