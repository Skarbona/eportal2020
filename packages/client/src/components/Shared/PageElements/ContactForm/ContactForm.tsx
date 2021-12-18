import React, { FC, memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, useMediaQuery } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

import Dialog from '../../UIElements/Dialog/Dialog';
import { setContactFormVisibility } from '../../../../store/app/action';
import { useForm } from '../../../../hooks/form/form-hook';
import { useFetch } from '../../../../hooks/fetch';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { GOOGLE_RECAPTCHA } from '../../../../constants/envs';
import { theme } from '../../../../settings/theme-settings';
import PrivacyPolicy from '../../Form/PrivacyPolicy';
import Email from '../../Form/Email';
import Message from '../../Form/Message';
import LoadingButton from '../../Form/LoadingButton';
import { SubmitEvent } from '../../../../models/typescript-events';
import AlertHandlerInfo from '../../UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { AlertTypes } from '../../../../models/alerts';

export const ContactFormComponent: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { isLoading, send, alert } = useFetch();
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged, recaptchaChanged, checkBoxChanged },
  } = useForm(
    [InputKeys.Email, InputKeys.Recaptcha, InputKeys.PrivacyPolicy, InputKeys.Message],
    false,
  );

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();
      const body = {
        message: inputs.message?.value,
        email: inputs.email?.value,
      };
      await send({
        url: 'emails/contact-form',
        method: 'post',
        body,
        successAlert: AlertTypes.SuccessEmail,
      });
    },
    [inputs.message, inputs.email, send],
  );

  useEffect(() => {
    if (alert === AlertTypes.SuccessEmail) {
      setTimeout(() => dispatch(setContactFormVisibility(false)), 2000);
    }
  }, [alert, dispatch]);

  const hideContactHandler = useCallback(() => {
    dispatch(setContactFormVisibility(false));
  }, [dispatch]);

  return (
    <Dialog className="contact-form" onClose={hideContactHandler} title={t('Contact Form')}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Email email={inputs?.email} inputChanged={inputChanged} />
          </Grid>
          <Grid item xs={12}>
            <Message message={inputs?.message} inputChanged={inputChanged} />
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA
              sitekey={GOOGLE_RECAPTCHA}
              onChange={recaptchaChanged}
              size={isSmallMobile ? 'compact' : 'normal'}
            />
          </Grid>
          <Grid item xs={12}>
            <PrivacyPolicy
              className="secondary-checkbox"
              privacyPolicy={inputs?.privacyPolicy}
              checkBoxChanged={checkBoxChanged}
            />
          </Grid>
          {alert && <AlertHandlerInfo type={alert} alert />}
          <Grid item xs={12}>
            <LoadingButton
              disabled={!isFormValid || alert === AlertTypes.SuccessEmail}
              isLoading={isLoading}
            >
              {t('Send message')}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default memo(ContactFormComponent);
