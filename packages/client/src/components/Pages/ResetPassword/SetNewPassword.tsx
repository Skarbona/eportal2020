import React, { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import AlertHandler from '../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { RootState } from '../../../store/store.interface';
import { SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { changePassword } from '../../../store/user/thunks/changePassword';
import { AlertTypes } from '../../../models/alerts';
import Password from '../../Shared/Form/Password';
import LoadingButton from '../../Shared/Form/LoadingButton';

interface SelectorProp {
  error: Error;
  alert: boolean;
  type: AlertTypes;
  isLoading: boolean;
}

export const SetNewPasswordComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { token } = useParams<{ token: string }>();
  const { alert, error, type, isLoading } = useSelector<RootState, SelectorProp>(({ user }) => ({
    error: user.error,
    alert: user.alert,
    type: user.alertType,
    isLoading: user.loading,
  }));
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged },
  } = useForm([InputKeys.Password], false);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      dispatch(changePassword(inputs.password.value, token));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputs.password.value],
  );

  return (
    <>
      <PageHeading
        title={t('Set New Password')}
        className="single-page-heading"
        disableBreadCrumbs
      />
      <PageContainer
        className="single-page page-set-new-password inputs-for-light-bg"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit}>
          <Password password={inputs?.password} inputChanged={inputChanged} />
          <AlertHandler error={error} alert={alert} type={type} />
          <LoadingButton
            disabled={!isFormValid || type === AlertTypes.NewUserDataSet}
            isLoading={isLoading}
          >
            {t('Set New Password')}
          </LoadingButton>
        </form>
      </PageContainer>
    </>
  );
};

export default memo(SetNewPasswordComponent);
