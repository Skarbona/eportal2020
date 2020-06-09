import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, FormControl, Grid, Typography, Button } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';

import Dialog from '../../UIElements/Dialog/Dialog';
import { setContactFormVisibility } from '../../../../store/app/action';
import { useForm } from '../../../../hooks/form/form-hook';
import { InputKeys } from '../../../../hooks/form/state/interface';
import { GOOGLE_RECAPTCHA } from '../../../../constants/envs';

export const ContactFormComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged, recaptchaChanged, checkBoxChanged },
  } = useForm([InputKeys.Email, InputKeys.Recaptcha], false);
  return (
    <Dialog onClose={() => dispatch(setContactFormVisibility(false))} title="Contact Form">
      <form>
        <Grid container>
          <Grid item xs>
            <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA} onChange={recaptchaChanged} />
          </Grid>
          <Grid item xs>
            <Button
              disabled={!isFormValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              SEND MESSAGE
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default memo(ContactFormComponent);
