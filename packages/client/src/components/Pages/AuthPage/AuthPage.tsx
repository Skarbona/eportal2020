import React, { FC, memo, useState, Fragment, useReducer, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Link, Button, FormControl, Grid, Typography, Avatar } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';

import './AuthPage.scss';
import Inputs from './Inputs';
import { authPageReducer } from './state/reducer';
import { initialState } from './state/initialState';
import {
  emailChanged,
  passwordChanged,
  confirmedEmailChanged,
  userNameChanged,
  setVisibleInputs,
  recaptchaChanged,
} from './state/actions';
import { InputChangeEvent } from '../../../models/typescript-events';
import { InputKeys } from './state/interface';

export const AuthPageComponent: FC<{}> = () => {
  const { t } = useTranslation();
  const [{ inputs, isFormValid }, dispatch] = useReducer(authPageReducer, initialState);

  const [isRegisterMode, setMode] = useState<boolean>(true);
  const setModeHandler = (): void => setMode(prevState => !prevState);

  useEffect(
    () => {
      const inputKeys = [InputKeys.Password, InputKeys.Email, InputKeys.Recaptcha];
      if (isRegisterMode) {
        inputKeys.push(InputKeys.ConfirmedEmail, InputKeys.Username);
      }
      dispatch(setVisibleInputs(inputKeys));
    },
    [isRegisterMode],
  );

  const passwordHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void => dispatch(passwordChanged(event, blurred)),
    [],
  );

  const userNameHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void => dispatch(userNameChanged(event, blurred)),
    [],
  );

  const emailHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void => dispatch(emailChanged(event, blurred)),
    [],
  );

  const confirmedEmailHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      dispatch(confirmedEmailChanged(event, blurred)),
    [],
  );

  const recaptchaHandler = useCallback(
    (value: string): void => dispatch(recaptchaChanged(value)),
    [],
  );

  const infoAction = (
    <Fragment>
      {!isRegisterMode && (
        <Grid item xs>
          <Link href="#" variant="body2">
            {t('Forgot password?')}
          </Link>
        </Grid>
      )}
      <Grid item>
        <Link onClick={setModeHandler} variant="body2" href="#">
          {isRegisterMode
            ? t('Do you have an account? Sign in')
            : t('Do not have an account? Sign Up')}
        </Link>
      </Grid>
    </Fragment>
  );

  return (
    <Container maxWidth="xs" className="auth-page">
      <div className="auth-page__form-wrapper">
        <form onSubmit={e => e.preventDefault()}>
          <FormControl>
            <Avatar className="avatar">
              <LockOutlined />
            </Avatar>
            <Typography variant="h3" component="h1">
              {isRegisterMode ? t('Register') : t('Log in')}
            </Typography>
            <Inputs
              passwordHandler={passwordHandler}
              userNameHandler={userNameHandler}
              emailHandler={emailHandler}
              confirmedEmailHandler={confirmedEmailHandler}
              inputs={inputs}
              isRegisterMode={isRegisterMode}
            />
            <Grid container> {infoAction}</Grid>
            <Grid container justify="center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                onChange={recaptchaHandler}
              />
            </Grid>
            <Button
              disabled={!isFormValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className=""
            >
              {isRegisterMode ? t('Sign Up') : t('Sign In')}
            </Button>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

export default memo(AuthPageComponent);
