import React, { FC, memo, useCallback, useEffect } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, FormControl, Grid, Typography, Avatar } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';

import './AuthPage.scss';
import Inputs from './Inputs';
import AlertHandler from '../../Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import { SubmitEvent } from '../../../models/typescript-events';
import { RootState } from '../../../store/store.interface';
import { authorizeUser } from '../../../store/user/thunks/authorizeUser';
import { useReduxDispatch } from '../../../store/helpers';
import { AuthorizationEndpoints } from '../../../models/endpoint-models';
import { AlertTypes } from '../../../models/alerts';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { PageParams } from '../../../models/page-types';
import { GOOGLE_RECAPTCHA } from '../../../constants/envs';
import LoadingButton from '../../Shared/Form/LoadingButton';

interface SelectorProps {
  error: Error;
  alertType: AlertTypes;
  isLoading: boolean;
}

const loginInputs = [InputKeys.Password, InputKeys.Email, InputKeys.Recaptcha];
const registerInputs = [
  ...loginInputs,
  InputKeys.ConfirmedEmail,
  InputKeys.Username,
  InputKeys.PrivacyPolicy,
];

export const AuthPageComponent: FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const isRegisterMode = pathname === PageParams.Register;
  const {
    state: { inputs, isFormValid },
    handlers: { setVisibleInputs, inputChanged, recaptchaChanged, checkBoxChanged },
  } = useForm(registerInputs, false);

  const { error, alertType, isLoading } = useSelector<RootState, SelectorProps>(({ user }) => ({
    error: user.error,
    alertType: user.alertType,
    isLoading: user.loading,
  }));

  useEffect(() => {
    setVisibleInputs(isRegisterMode ? registerInputs : loginInputs);
    // eslint-disable-next-line
  }, [isRegisterMode]);

  const setModeHandler = (): void =>
    history.push(isRegisterMode ? PageParams.Login : PageParams.Register);

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
      if (success) history.push(PageParams.Game);
    },
    [isRegisterMode, inputs, dispatch, history],
  );

  const infoAction = (
    <>
      {!isRegisterMode && (
        <Grid item xs>
          <Link
            to={PageParams.ResetPassword}
            component={RouterLink}
            variant="body2"
            className="link__forgot-password"
          >
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
    <PageContainer maxWidth="xs" className="auth-page">
      <div className="auth-page__form-wrapper inputs-for-light-bg">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Avatar className="avatar">
              <LockOutlined />
            </Avatar>
            <Typography variant="h3" component="h1" className="auth-page__title">
              {isRegisterMode ? t('Register') : t('Log in')}
            </Typography>
            <Inputs
              inputChanged={inputChanged}
              inputs={inputs}
              isRegisterMode={isRegisterMode}
              checkBoxChanged={checkBoxChanged}
            />
            <Grid container> {infoAction}</Grid>
            <Grid container justify="center">
              <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA} onChange={recaptchaChanged} />
            </Grid>
            <AlertHandler error={error} type={alertType} />
            <LoadingButton disabled={!isFormValid} isLoading={isLoading}>
              {isRegisterMode ? t('Sign Up') : t('Sign In')}
            </LoadingButton>
          </FormControl>
        </form>
      </div>
    </PageContainer>
  );
};

export default memo(AuthPageComponent);
