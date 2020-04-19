import React, { FC, memo, Fragment } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CheckIfHasEnoughPosts } from '../../../../../store/game/initialState.interface';

export interface Props {
  levels: string[];
  isReadyToStartGame: CheckIfHasEnoughPosts['level1'][];
}

export const WhatWeHaveComponent: FC<Props> = ({ isReadyToStartGame, levels }) => {
  const { t } = useTranslation();
  return (
    <List>
      {levels.map((level, index) => {
        const levelValues = Object.values(isReadyToStartGame)[index];
        let listItemClass;
        if (levelValues.hasEnough) {
          listItemClass = 'task-success';
        } else if (levelValues.has > 0) {
          listItemClass = 'task-warning';
        } else {
          listItemClass = 'task-error';
        }
        return (
          <Fragment key={level}>
            <ListItem className={listItemClass}>
              <ListItemAvatar>
                <Avatar className="main-bg-color">{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={level}
                secondary={`${levelValues.has} ${t('tasks')} (${t('expected')}: ${
                  levelValues.expected
                })`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
};

export default memo(WhatWeHaveComponent);
