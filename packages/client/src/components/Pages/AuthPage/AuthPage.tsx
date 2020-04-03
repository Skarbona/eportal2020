import React, {
  FC,
  memo,
  useState,
  Fragment,
  useReducer,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Link, Button, FormControl, Grid, Typography, Avatar } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';

import './AuthPage.scss';
import Inputs from './Inputs';
import { authPageReducer } from './state/reducer';
import { initialState } from './state/initialState';
import * as A from './state/actions';
import { InputChangeEvent, SubmitEvent } from '../../../models/typescript-events';
import { InputKeys } from './state/interface';
import { authorizeUser } from '../../../store/user/thunk';
import { AuthContext } from '../../../context/auth-context';
import { AuthorizationEndpoints } from '../../../models/endpoint-models';
import { useReduxDispatch } from '../../../store/helpers';

export const AuthPageComponent: FC = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [{ inputs, isFormValid }, formDispatch] = useReducer(authPageReducer, initialState);

  const [isRegisterMode, setMode] = useState<boolean>(true);
  const setModeHandler = (): void => setMode((prevState) => !prevState);

  useEffect(() => {
    const inputKeys = [InputKeys.Password, InputKeys.Email, InputKeys.Recaptcha];
    if (isRegisterMode) {
      inputKeys.push(InputKeys.ConfirmedEmail, InputKeys.Username);
    }
    formDispatch(A.setVisibleInputs(inputKeys));
  }, [isRegisterMode]);

  const passwordHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      formDispatch(A.passwordChanged(event, blurred)),
    [],
  );

  const userNameHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      formDispatch(A.userNameChanged(event, blurred)),
    [],
  );

  const emailHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      formDispatch(A.emailChanged(event, blurred)),
    [],
  );

  const confirmedEmailHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      formDispatch(A.confirmedEmailChanged(event, blurred)),
    [],
  );

  const recaptchaHandler = useCallback(
    (value: string): void => formDispatch(A.recaptchaChanged(value)),
    [],
  );

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
      const data = await dispatch(authorizeUser(requestType, body));
      if (data?.userData && data.token) {
        login(data.userData.id, data.token);
        history.push('/gra');
      }
    },
    [
      isRegisterMode,
      inputs.password.value,
      inputs.userName.value,
      inputs.email.value,
      dispatch,
      login,
      history,
    ],
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
        <form onSubmit={handleSubmit}>
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
