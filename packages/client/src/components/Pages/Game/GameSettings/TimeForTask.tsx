import { FormControlLabel, Grid, Slider, Switch } from '@material-ui/core';
import { Timelapse } from '@material-ui/icons';
import React, { FC, memo, useState } from 'react';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';

enum TimeMode {
  Single,
  Range,
}

export const TimeForTaskComponent: FC<{}> = () => {
  const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.Single);
  const [singleState, setSingleState] = useState<number>(2);
  const [rangeState, setRangeState] = useState<number[]>([2, 5]);

  const handleSwitchChange = (): void => {
    if (timeMode === TimeMode.Single) {
      setTimeMode(TimeMode.Range);
    } else {
      setTimeMode(TimeMode.Single);
    }
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSingleChange = (event: any, newValue: number | number[]): void =>
    setSingleState(newValue as number);

  const handleRangeChange = (event: any, newValue: number | number[]): void =>
    setRangeState(newValue as number[]);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const subtitleHandler = (): string => {
    if (timeMode === TimeMode.Single) {
      return `(${singleState} min)`;
    }
    return `(od ${rangeState[0]} min do ${rangeState[1]} min)`;
  };

  return (
    <ExpansionPanelComponent
      icon={<Timelapse />}
      subtitle={subtitleHandler()}
      title="Czas na wykonanie 1 zadania"
      className="game__time"
    >
      <Grid container spacing={1}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={timeMode !== TimeMode.Single}
              onChange={handleSwitchChange}
              name="Time Mode"
            />
          }
          label="Z przedziałami czasowymi"
        />
        {timeMode === TimeMode.Single && (
          <Slider
            value={singleState}
            onChange={handleSingleChange}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={10}
            marks
          />
        )}
        {timeMode === TimeMode.Range && (
          <Slider
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            value={rangeState}
            onChange={handleRangeChange}
            step={1}
            min={1}
            max={10}
            marks
          />
        )}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(TimeForTaskComponent);
