import React, { FC, Fragment, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import './GameSettings.scss';

import { PageTypes } from '../../../../models/page-types';
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
  catsError: Error;
  gameError: Error;
  defaults: FormValues;
}

export const GameSettingComponent: FC<{}> = () => {
  const dispatch = useReduxDispatch();
  const [isFormValid, setFormValidation] = useState<boolean>(false);
  const { cats, loading, catsError, gameError, defaults } = useSelector<
    RootState,
    GameSettingStoreProps
  >(({ categories, game, user }) => ({
    cats: categories.categories,
    loading: categories.loading || game.loading,
    catsError: categories.error,
    gameError: categories.error,
    defaults: user.userData.gameDefaults,
  }));

  const onSubmitHandler = (event: SubmitEvent): void => {
    event.preventDefault();
    dispatch(startGameHandler());
  };
  return (
    <Fragment>
      <ErrorHandler
        error={gameError || catsError}
        type={catsError ? PageTypes.CategorySettings : PageTypes.FetchingPosts}
      />
      {loading && <CircleLoading />}
      {(!gameError || !catsError) && defaults && cats && (
        <div className="game__settings">
          <form onSubmit={onSubmitHandler}>
            <Typography variant="h3" component="h1">
              Nowa Gra
            </Typography>
            <PlayersNames defaults={defaults.names} />
            <Places places={cats.places} defaults={defaults.place} />
            <Preferences
              preferences={cats.preferences}
              setFormValidation={setFormValidation}
              defaults={defaults.catsQuery.catsInclude}
            />
            <NumberOfTasksPerLevel levels={cats.levels} defaults={defaults.levels} />
            <TimeForTask defaults={defaults.time} />
            <DefaultSettings />
            <StartButton isFormValid={isFormValid} />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default memo(GameSettingComponent);
