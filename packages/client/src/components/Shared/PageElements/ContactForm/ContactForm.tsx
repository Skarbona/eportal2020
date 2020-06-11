import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';

import { useTranslation } from 'react-i18next';
import Dialog from '../../UIElements/Dialog/Dialog';
import { setContactFormVisibility } from '../../../../store/app/action';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { GOOGLE_RECAPTCHA } from '../../../../constants/envs';
import { theme } from '../../../../settings/theme-settings';
import PrivacyPolicy from '../../Form/PrivacyPolicy';
import Email from '../../Form/Email';

export const ContactFormComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged, recaptchaChanged, checkBoxChanged },
  } = useForm([InputKeys.Email, InputKeys.Recaptcha, InputKeys.PrivacyPolicy], false);
  return (
    <Dialog onClose={() => dispatch(setContactFormVisibility(false))} title="Contact Form">
      <form>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Email email={inputs?.email} inputChanged={inputChanged} />
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
              privacyPolicy={inputs?.privacyPolicy}
              checkBoxChanged={checkBoxChanged}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!isFormValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {t('Send message')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default memo(ContactFormComponent);
