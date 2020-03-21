import React, { FC, memo, useState, useEffect } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { FormatListNumbered } from '@material-ui/icons';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { InputChangeEvent } from '../../../../models/typescript-events';

interface Props {
  levels: CategoryInterface;
}

interface State {
  value: number;
  id: string;
  name: string;
}

export const NumberOfTasksPerLevelComponent: FC<Props> = ({ levels }) => {
  const [selectedNumber, setSelectedNumber] = useState<State[]>(null);
  useEffect(() => {
    if (levels && levels.children) {
      setSelectedNumber(
        levels.children.map(level => ({ value: 10, id: level.id, name: level.name })),
      );
    }
  }, [levels]);

  const onChangeHandler = (event: InputChangeEvent, index: number): void => {
    const newState = [...selectedNumber];
    const value = parseInt(event.target.value, 10);
    const numberToSet = value >= 1 ? value : 1;
    newState[index].value = numberToSet;
    setSelectedNumber(newState);
  };

  if (!selectedNumber) return null;

  const subtitle = `(${selectedNumber.map(level => level.value)})`;
  return (
    <ExpansionPanelComponent
      icon={<FormatListNumbered />}
      subtitle={subtitle}
      title="Liczba zadań na poziom"
      className="game__levels"
    >
      <Grid container spacing={1}>
        {selectedNumber &&
          selectedNumber.map((level, index) => (
            <Grid item xs={12} md={4} key={level.id}>
              <TextField
                label={level.name}
                id={level.id}
                onChange={(e): void => onChangeHandler(e, index)}
                value={level.value}
                className="form-element__default-width number-input"
                variant="filled"
                type="number"
              />
            </Grid>
          ))}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(NumberOfTasksPerLevelComponent);
