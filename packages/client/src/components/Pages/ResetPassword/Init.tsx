import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import AlertHandler from '../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { getResetPasswordLink } from '../../../store/user/thunks/getResetPasswordLink';
import { RootState } from '../../../store/store.interface';
import { AlertTypes } from '../../../models/alerts';
import LoadingButton from '../../Shared/Form/LoadingButton';
import Email from '../../Shared/Form/Email';

interface SelectorProp {
  error: Error;
  alert: boolean;
  type: AlertTypes;
  isLoading: boolean;
}

export const InitResetPasswordComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { alert, error, type, isLoading } = useSelector<RootState, SelectorProp>(({ user }) => ({
    error: user.error,
    alert: user.alert,
    type: user.alertType,
    isLoading: user.loading,
  }));
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged },
  } = useForm([InputKeys.Email], false);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      dispatch(getResetPasswordLink(inputs.email.value));
    },
    [dispatch, inputs.email.value],
  );

  return (
    <>
      <PageHeading title={t('Reset Password')} className="single-page-heading" />
      <PageContainer
        className="single-page page-reset-password__init inputs-for-light-bg"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit}>
          <Email email={inputs.email} inputChanged={inputChanged} />
          <AlertHandler error={error} alert={alert} type={type} />
          <LoadingButton
            disabled={!isFormValid || type === AlertTypes.CheckYourEmail}
            isLoading={isLoading}
          >
            {t('Reset Password')}
          </LoadingButton>
        </form>
      </PageContainer>
    </>
  );
};

export default memo(InitResetPasswordComponent);
