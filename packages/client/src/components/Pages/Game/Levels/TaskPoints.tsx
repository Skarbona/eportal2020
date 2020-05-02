import React, { FC, memo, useEffect } from 'react';
import { Grid, Avatar, Typography, Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import './scss/TaskPoints.scss';
import { useTaskPointsSelector } from './selector-hooks';
import { setPoints } from '../../../../store/game/action';
import { LocalStorage } from '../../../../models/local-storage';
import { GameStateInterface } from '../../../../store/game/initialState.interface';

export const TaskPointsComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const { she, he, points } = useTaskPointsSelector();

  useEffect(() => {
    const playerPoints: GameStateInterface['points'] = JSON.parse(
      window.localStorage.getItem(LocalStorage.PlayersPoints || '{}'),
    );

    if (playerPoints) {
      dispatch(setPoints(playerPoints));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (points) {
      window.localStorage.setItem(LocalStorage.PlayersPoints, JSON.stringify(points));
    }
  }, [points]);

  return (
    <Grid container spacing={3} className="task-points" justify="space-around" alignItems="center">
      <Grid item className="task-points__player">
        <Avatar src="./media/icons/female.png" className="task-points__avatar" />
        <Chip color="primary" label={points.woman} className="points-label" />
        <Typography variant="h3" className="player-name">
          {she}
        </Typography>
      </Grid>
      <Grid item className="task-points__player">
        <Avatar src="./media/icons/male.png" className="task-points__avatar" />
        <Chip color="primary" label={points.man} className="points-label" />
        <Typography variant="h3" className="player-name">
          {he}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(TaskPointsComponent);
