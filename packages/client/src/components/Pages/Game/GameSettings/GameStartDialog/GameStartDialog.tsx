import React, { FC, memo, useEffect, useState, useCallback } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

import './GameStartDialog.scss';
import Dialog from '../../../../Shared/UIElements/Dialog/Dialog';
import WhatWeHave from './WhatWeHave';
import { setGameStatus } from '../../../../../store/game/thunks/setGameStatus';
import { GameStatus } from '../../../../../models/game-models';
import { CheckIfHasEnoughPosts } from '../../../../../store/game/initialState.interface';
import { RootState } from '../../../../../store/store.interface';
import { useReduxDispatch } from '../../../../../store/helpers';
import { FormValues } from '../../../../../../../service/src/models/shared-interfaces/user';
import { setFormValues } from '../../../../../store/game/action';

interface SelectorProps {
  isReadyToStartGame: CheckIfHasEnoughPosts;
  levels: string[];
  levelsValues: CheckIfHasEnoughPosts['level1'][];
}

enum MessageType {
  NoTaskAtAll = 'NoTaskAtAll',
  WeCanStartWithSmallerAmount = 'WeCanStartWithSmallerAmount',
}

export const GameStartComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [showDialog, setDialogStatus] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>(null);
  const { isReadyToStartGame, levels, levelsValues } = useSelector<RootState, SelectorProps>(
    ({ game, categories }) => ({
      isReadyToStartGame: game.isReadyToStartGame,
      levelsValues: [
        game.isReadyToStartGame?.level1,
        game.isReadyToStartGame?.level2,
        game.isReadyToStartGame?.level3,
      ],
      levels: categories.categories.levels?.children.map((level) => level.name),
    }),
  );

  const hideDialogHandler = useCallback(() => setDialogStatus(false), []);
  const showDialogHandler = useCallback(() => setDialogStatus(true), []);
  const startGameHandler = useCallback(() => {
    dispatch(setGameStatus(GameStatus.Level1));
    const payload: Partial<FormValues> = {
      levels: {
        level1: isReadyToStartGame.level1.has,
        level2: isReadyToStartGame.level2.has,
        level3: isReadyToStartGame.level3.has,
      },
    };
    dispatch(setFormValues(payload));
  }, [
    dispatch,
    isReadyToStartGame.level1.has,
    isReadyToStartGame.level2.has,
    isReadyToStartGame.level3.has,
  ]);

  useEffect(() => {
    if (isReadyToStartGame?.hasEnough) {
      dispatch(setGameStatus(GameStatus.Level1));
    } else if (isReadyToStartGame?.canStartWithSmallerAmount) {
      showDialogHandler();
      setMessageType(MessageType.WeCanStartWithSmallerAmount);
    } else if (isReadyToStartGame?.level1) {
      showDialogHandler();
      setMessageType(MessageType.NoTaskAtAll);
    }
  }, [dispatch, isReadyToStartGame, showDialogHandler]);

  return (
    <>
      {showDialog && (
        <Dialog
          onClose={hideDialogHandler}
          title={t('Not enough tasks')}
          className="game-start-dialog"
          actions={
            <Grid container spacing={3} className="game-start-dialog__grid">
              <Grid item xs={12} sm={12} md={6}>
                <Button
                  autoFocus
                  onClick={hideDialogHandler}
                  variant="contained"
                  className="warning-button"
                >
                  {t('I will configure game parameters')}
                </Button>
              </Grid>
              {messageType === MessageType.WeCanStartWithSmallerAmount && (
                <Grid item xs={12} sm={12} md={6}>
                  <Button
                    variant="contained"
                    autoFocus
                    onClick={startGameHandler}
                    className="success-button"
                  >
                    {t('I am ok with that')}
                  </Button>
                </Grid>
              )}
            </Grid>
          }
        >
          {messageType === MessageType.NoTaskAtAll ? (
            <>
              <Alert severity="error">
                {t('Try change params')}
                <br />
                {t('What we have')}:
              </Alert>
              <WhatWeHave levels={levels} isReadyToStartGame={levelsValues} />
            </>
          ) : (
            <>
              <Alert severity="warning">
                {t('You can still start game')}
                <br />
                {t('What we have')}:
              </Alert>
              <WhatWeHave levels={levels} isReadyToStartGame={levelsValues} />
            </>
          )}
        </Dialog>
      )}
    </>
  );
};

export default memo(GameStartComponent);
