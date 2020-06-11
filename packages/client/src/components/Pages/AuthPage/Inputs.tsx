import React, { FC, memo } from 'react';

import { FormState } from '../../../hooks/form/state/interface';
import { CheckboxChangeEvent, InputChangeEvent } from '../../../models/typescript-events';
import Email from '../../Shared/Form/Email';
import ConfirmEmail from '../../Shared/Form/ConfirmEmail';
import PrivacyPolicy from '../../Shared/Form/PrivacyPolicy';
import UserName from '../../Shared/Form/UserName';
import Password from '../../Shared/Form/Password';

export interface Props {
  inputChanged(value: InputChangeEvent, blurred?: boolean): void;
  checkBoxChanged(value: CheckboxChangeEvent): void;
  inputs: FormState['inputs'];
  isRegisterMode: boolean;
}

export const InputsComponent: FC<Props> = ({
  inputChanged,
  checkBoxChanged,
  inputs,
  isRegisterMode,
}) => {
  return (
    <>
      <Email email={inputs?.email} inputChanged={inputChanged} />
      {isRegisterMode && (
        <ConfirmEmail confirmedEmail={inputs?.confirmedEmail} inputChanged={inputChanged} />
      )}
      {isRegisterMode && <UserName userName={inputs?.userName} inputChanged={inputChanged} />}
      <Password password={inputs?.password} inputChanged={inputChanged} />
      {isRegisterMode && (
        <PrivacyPolicy
          className="primary-checkbox privacy-policy__checkbox"
          privacyPolicy={inputs?.privacyPolicy}
          checkBoxChanged={checkBoxChanged}
        />
      )}
    </>
  );
};

export default memo(InputsComponent);
