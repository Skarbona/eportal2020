import React, { FC, memo, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Container, Link, Button, FormControl, Grid, Typography, Avatar } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';

import './AuthPage.scss';
import Inputs from './Inputs';
import ErrorHandler from '../../Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import { SubmitEvent } from '../../../models/typescript-events';
import { RootState } from '../../../store/store.interface';
import { authorizeUser } from '../../../store/user/thunks/authorizeUser';
import { useReduxDispatch } from '../../../store/helpers';
import { AuthorizationEndpoints } from '../../../models/endpoint-models';
import { PageParams } from '../../../models/page-types';
import { ErrorTypes } from '../../../models/errors';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';

interface SelectorProps {
  error: Error;
  errorType: ErrorTypes;
}

const loginInputs = [InputKeys.Password, InputKeys.Email, InputKeys.Recaptcha];
const registerInputs = [...loginInputs, InputKeys.ConfirmedEmail, InputKeys.Username];

export const AuthPageComponent: FC = () => {
  const history = useHistory();
  const { mode } = useParams();
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const isRegisterMode = mode === PageParams.Register;
  const {
    state: { inputs, isFormValid },
    handlers: { setVisibleInputs, inputChanged, recaptchaChanged },
  } = useForm(registerInputs, false);

  const { error, errorType } = useSelector<RootState, SelectorProps>(({ user }) => ({
    error: user.error,
    errorType: user.errorType,
  }));

  useEffect(() => {
    setVisibleInputs(isRegisterMode ? registerInputs : loginInputs);
    // eslint-disable-next-line
  }, [isRegisterMode]);

  const setModeHandler = (): void => {
    if (isRegisterMode) {
      history.push(`/autentykacja/${PageParams.Login}`);
    } else {
      history.push(`/autentykacja/${PageParams.Register}`);
    }
  };

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();
      const requestType = isRegisterMode
        ? AuthorizationEndpoints.Signup
        : AuthorizationEndpoints.Login;
      const body = {
        password: inputs.password.value,
        userName: inputs.userName.value,
        email: inputs.email.value,
      };
      const success = await dispatch(authorizeUser(requestType, body));
      if (success) history.push('/gra');
    },
    [isRegisterMode, inputs, dispatch, history],
  );

  const infoAction = (
    <>
      {!isRegisterMode && (
        <Grid item xs>
          <Link href="#" variant="body2" className="link__forgot-password">
            {t('Forgot password?')}
          </Link>
        </Grid>
      )}
      <Grid item>
        <Link onClick={setModeHandler} variant="body2" href="#" className="link__switch-mode">
          {isRegisterMode
            ? t('Do you have an account? Sign in')
            : t('Do not have an account? Sign Up')}
        </Link>
      </Grid>
    </>
  );

  return (
    <Container maxWidth="xs" className="auth-page">
      <div className="auth-page__form-wrapper">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Avatar className="avatar">
              <LockOutlined />
            </Avatar>
            <Typography variant="h3" component="h1" className="auth-page__title">
              {isRegisterMode ? t('Register') : t('Log in')}
            </Typography>
            <Inputs inputChanged={inputChanged} inputs={inputs} isRegisterMode={isRegisterMode} />
            <Grid container> {infoAction}</Grid>
            <Grid container justify="center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                onChange={recaptchaChanged}
              />
            </Grid>
            <ErrorHandler error={error} type={errorType} />
            <Button
              disabled={!isFormValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
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
