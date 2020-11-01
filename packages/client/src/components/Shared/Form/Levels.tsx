import React, { FC, memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CategoryInterface } from '../../../store/categories/initialState.interface';
import { SelectChangeEvent } from '../../../models/typescript-events';

export const LevelsComponent: FC<Props> = ({ levels, level, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <FormControl variant="filled" className="form-element__default-width">
      <InputLabel id="place_label">{t('Place of game')}</InputLabel>
      <Select labelId="place_label" id="levels" value={level} onChange={inputChanged} name="levels">
        {levels.children.map((levelChild) => (
          <MenuItem value={levelChild.id} key={levelChild.id}>
            {levelChild.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export interface Props {
  levels: CategoryInterface;
  level: string;
  inputChanged: (event: SelectChangeEvent) => void;
}

export default memo(LevelsComponent);
