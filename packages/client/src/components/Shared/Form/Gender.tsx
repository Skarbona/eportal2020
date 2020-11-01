import React, { FC, memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CategoryInterface } from '../../../store/categories/initialState.interface';
import { SelectChangeEvent } from '../../../models/typescript-events';

export const GenderComponent: FC<Props> = ({ genders, gender, inputChanged }) => {
  const { t } = useTranslation();
  return (
    <FormControl variant="filled" className="form-element__default-width">
      <InputLabel id="gender_label">{t('Gender')}</InputLabel>
      <Select
        labelId="gender_label"
        id="gender"
        value={gender}
        onChange={inputChanged}
        name="gender"
      >
        {genders.children.map((genderChild) => (
          <MenuItem value={genderChild.id} key={genderChild.id}>
            {genderChild.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export interface Props {
  genders: CategoryInterface;
  gender: string;
  inputChanged: (event: SelectChangeEvent) => void;
}

export default memo(GenderComponent);
