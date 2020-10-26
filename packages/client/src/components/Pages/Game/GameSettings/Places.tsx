import { useTranslation } from 'react-i18next';
import React, { FC, memo, useEffect, useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { Place } from '@material-ui/icons';

import { SelectChangeEvent } from '../../../../models/typescript-events';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';

import ExpansionPanelComponent from '../../../Shared/UIElements/ExpansionPanel/ExpansionPanel';
import PlacesInput from '../../../Shared/Form/Places';
import { useReduxDispatch } from '../../../../store/helpers';
import { setFormValues } from '../../../../store/game/action';

export interface Props {
  places: CategoryInterface;
  defaults: string;
}

export const PlacesComponent: FC<Props> = ({ places, defaults }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [selectedPlace, setSelectedPlace] = useState<string>(null);
  const [subtitle, setSubtitle] = useState<string>('(...)');

  useEffect(
    () => {
      if (places?.children) {
        const findDefaultPlace = places.children.find((place) => place.id === defaults);
        setSelectedPlace(findDefaultPlace ? findDefaultPlace.id : places.children[0].id);
        setSubtitle(`(${findDefaultPlace ? findDefaultPlace.name : places.children[0].name})`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [places],
  );

  useEffect(() => {
    const payload: Partial<FormValues> = { place: selectedPlace };
    dispatch(setFormValues(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleOnChange = useCallback((event: SelectChangeEvent, value: any): void => {
    setSelectedPlace(event.target.value as string);
    setSubtitle(`(${value.props.children})`);
  }, []);

  return (
    <ExpansionPanelComponent
      icon={<Place />}
      subtitle={subtitle}
      title={t('Place of game')}
      className="game__places"
    >
      <Grid container spacing={1}>
        {selectedPlace && (
          <PlacesInput place={selectedPlace} inputChanged={handleOnChange} places={places} />
        )}
      </Grid>
    </ExpansionPanelComponent>
  );
};

export default memo(PlacesComponent);
