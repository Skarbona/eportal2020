import React, { FC, memo, useEffect, useState, useCallback } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

import './GameStartDialog.scss';
import Dialog from '../../../../Shared/UIElements/Dialog/Dialog';
import WhatWeHave from './WhatWeHave';
import { setGameStatus } from '../../../../../store/game/thunks/setGameStatus';
import { GameStatus } from '../../../../../models/game-models';
import { useReduxDispatch } from '../../../../../store/helpers';
import { FormValues } from '../../../../../../../service/src/models/shared-interfaces/user';
import { setFormValues } from '../../../../../store/game/action';
import { useGameStartSelector } from '../selector-hooks';

enum MessageType {
  NoTaskAtAll = 'NoTaskAtAll',
  WeCanStartWithSmallerAmount = 'WeCanStartWithSmallerAmount',
}

export const GameStartComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [showDialog, setDialogStatus] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>(null);
  const { isReadyToStartGame, levels, levelsValues } = useGameStartSelector();

  const hideDialogHandler = useCallback(() => setDialogStatus(false), []);
  const showDialogHandler = useCallback(() => setDialogStatus(true), []);
  const startGameHandler = useCallback(() => {
    const { level1, level2, level3 } = isReadyToStartGame;
    const payload: Partial<FormValues> = {
      levels: {
        level1: level1.hasEnough ? level1.expected : level1.has,
        level2: level2.hasEnough ? level2.expected : level2.has,
        level3: level3.hasEnough ? level3.expected : level3.has,
      },
    };
    dispatch(setFormValues(payload));
    dispatch(setGameStatus(GameStatus.Level1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToStartGame]);

  useEffect(() => {
    if (isReadyToStartGame?.canStartWithSmallerAmount) {
      showDialogHandler();
      setMessageType(MessageType.WeCanStartWithSmallerAmount);
    } else if (isReadyToStartGame?.level1) {
      showDialogHandler();
      setMessageType(MessageType.NoTaskAtAll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToStartGame]);

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
            <Alert severity="error">
              {t('Try change params')}
              <br />
              {t('What we have')}:
            </Alert>
          ) : (
            <Alert severity="warning">
              {t('You can still start game')}
              <br />
              {t('What we have')}:
            </Alert>
          )}
          <WhatWeHave levels={levels} isReadyToStartGame={levelsValues} />
        </Dialog>
      )}
    </>
  );
};

export default memo(GameStartComponent);
