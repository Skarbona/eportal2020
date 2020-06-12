import React, { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link, FormControlLabel, Checkbox } from '@material-ui/core';

import { PageParams } from '../../../models/page-types';
import { FormState } from '../../../hooks/form/state/interface';
import { CheckboxChangeEvent } from '../../../models/typescript-events';

export interface Props {
  checkBoxChanged(value: CheckboxChangeEvent): void;
  privacyPolicy: FormState['inputs']['privacyPolicy'];
  className?: string;
}

export const PrivacyPolicyComponent: FC<Props> = ({
  privacyPolicy,
  checkBoxChanged,
  className = 'primary-checkbox',
}) => {
  const { t } = useTranslation();
  return (
    <FormControlLabel
      className={className}
      id="privacy-policy"
      control={
        <Checkbox
          checked={privacyPolicy?.value}
          onChange={checkBoxChanged}
          name="privacyPolicy"
          color="primary"
        />
      }
      label={
        <>
          {t('I accept')}{' '}
          {
            <Link
              to={PageParams.PrivacyPolice}
              component={RouterLink}
              color="inherit"
              target="_blank"
            >
              {t('Privacy Policy')}
            </Link>
          }{' '}
          *
        </>
      }
    />
  );
};

export default memo(PrivacyPolicyComponent);
