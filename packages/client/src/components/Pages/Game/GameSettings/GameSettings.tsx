import './GameSettings.scss';

import React, { FC, Fragment, memo } from 'react';
import { useSelector } from 'react-redux';

import { PageTypes } from '../../../../models/pageTypes';
import { RootState } from '../../../../store/store.interface';
import ErrorHandler from '../../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import CircleLoading from '../../../Shared/UIElements/Loading/CircleLoading';
import { GameSettingStoreProps } from '../Game.interface';
import DefaultSettings from './DefaultSettings';
import NumberOfTasksPerLevel from './NumberOfTasksPerLevel';
import Places from './Places';
import PlayersNames from './PlayersNames';
import Preferences from './Preferences';
import TimeForTask from './TimeForTask';

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
