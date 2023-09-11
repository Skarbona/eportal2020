import React, { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Slider, Switch } from '@material-ui/core';
import { Timelapse } from '@material-ui/icons';

import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import { TimeMode } from '../../../../models/game-models';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';
import { ExpansionPanelPremiumTitle } from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanelPremiumTitle';
import { usePremiumUser } from '../../../../hooks/usePremiumUser';
import { PremiumStar } from '../../../Shared/UIElements/PremiumStar';

export interface Props {
  defaults: FormValues['time'];
}

export const TimeForTaskComponent: FC<Props> = ({ defaults }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { isPremium } = usePremiumUser();
  const [timeMode, setTimeMode] = useState<TimeMode>(!isPremium ? TimeMode.Single : defaults.type);
  const [singleState, setSingleState] = useState<number[]>(getSingleDefault(isPremium, defaults));
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
        type: isPremium ? TimeMode.Single : timeMode,
        value: timeMode === TimeMode.Single ? singleState : rangeState,
      },
    };
    dispatch(setFormValues(payload));
  }, [timeMode, singleState, rangeState, dispatch, isPremium]);

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
      title={<ExpansionPanelPremiumTitle title={t('Time for finishing 1 task')} />}
      className="game__time"
    >
      <Grid container spacing={1}>
        <FormControlLabel
          control={
            <Switch
              disabled={!isPremium}
              color="primary"
              data-test="time-switch"
              checked={timeMode !== TimeMode.Single}
              onChange={handleSwitchChange}
              name="Time Mode"
            />
          }
          label={
            <div>
              {t('With time ranges')}
              <PremiumStar />
            </div>
          }
        />
        {timeMode === TimeMode.Single && (
          <Slider
            disabled={!isPremium}
            value={singleState[0]}
            data-test="time-slider"
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
            disabled={!isPremium}
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

const getSingleDefault = (isPremium: boolean, defaults: FormValues['time']): number[] => {
  if (!isPremium) return [2];
  return defaults.type === TimeMode.Single ? defaults.value : [2];
};

export default memo(TimeForTaskComponent);
