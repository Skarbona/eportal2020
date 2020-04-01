import React, { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Slider, Switch } from '@material-ui/core';
import { Timelapse } from '@material-ui/icons';

import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import { TimeMode } from '../../../../models/game-models';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export interface Props {
  defaults: FormValues['time'];
}

export const TimeForTaskComponent: FC<Props> = ({ defaults }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [timeMode, setTimeMode] = useState<TimeMode>(defaults.type);
  const [singleState, setSingleState] = useState<number[]>(
    defaults.type === TimeMode.Single ? defaults.value : [2],
  );
  const [rangeState, setRangeState] = useState<number[]>(
    defaults.type === TimeMode.Range ? defaults.value : [2, 5],
  );

  const handleSwitchChange = (): void => {
    if (timeMode === TimeMode.Single) {
      setTimeMode(TimeMode.Range);
    } else {
      setTimeMode(TimeMode.Single);
    }
  };

  useEffect(() => {
    const payload: Partial<FormValues> = {
      time: {
        type: timeMode,
        value: timeMode === TimeMode.Single ? singleState : rangeState,
      },
    };
    dispatch(setFormValues(payload));
  }, [timeMode, singleState, rangeState, dispatch]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSingleChange = (event: any, newValue: number | number[]): void =>
    setSingleState([newValue as number]);

  const handleRangeChange = (event: any, newValue: number | number[]): void =>
    setRangeState(newValue as number[]);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const subtitleHandler = (): string => {
    if (timeMode === TimeMode.Single) {
      return `(${singleState[0]} min)`;
    }
    return `(${t('from')} ${rangeState[0]} min ${t('to')} ${rangeState[1]} min)`;
  };

  return (
    <ExpansionPanelComponent
      icon={<Timelapse />}
      subtitle={subtitleHandler()}
      title={t('Time for finishing 1 task')}
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
          label={t('With time ranges')}
        />
        {timeMode === TimeMode.Single && (
          <Slider
            value={singleState[0]}
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
