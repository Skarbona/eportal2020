import React, { FC, memo, useState, Fragment, useReducer, useCallback } from 'react';
import { Container, Link, Button, FormControl, Grid } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';

import './AuthPage.scss';
import Inputs from './Inputs';
import { authPageReducer } from './state/reducer';
import { initialState } from './state/initialState';
import {
  emailChanged,
  passwordChanged,
  repeatEmailChanged,
  userNameChanged,
} from './state/actions';
import { InputChangeEvent } from '../../../models/typescript-events';

export const AuthPageComponent: FC<{}> = () => {
  const [{ inputs, isFormValid }, dispatch] = useReducer(authPageReducer, initialState);

  const [isRegisterMode, setMode] = useState<boolean>(true);
  const setModeHandler = (): void => setMode(prevState => !prevState);

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

  const repeatedEmailHandler = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      dispatch(repeatEmailChanged(event, blurred)),
    [],
  );

  const infoAction = (
    <Fragment>
      {!isRegisterMode && (
        <Grid item xs>
          <Link href="#" variant="body2">
            Zapomniałeś hasła?
          </Link>
        </Grid>
      )}
      <Grid item>
        <Link onClick={setModeHandler} variant="body2" href="#">
          {isRegisterMode
            ? 'Posiadasz już konta? Zaloguj się'
            : 'Nie posiadasz konta? Zarejestruj się'}
        </Link>
      </Grid>
    </Fragment>
  );

  return (
    <Container maxWidth="xs" className="auth-page">
      <div className="auth-page__form-wrapper">
        <form onSubmit={e => e.preventDefault()}>
          <FormControl>
            <Inputs
              passwordHandler={passwordHandler}
              userNameHandler={userNameHandler}
              emailHandler={emailHandler}
              repeatedEmailHandler={repeatedEmailHandler}
              inputs={inputs}
              isRegisterMode={isRegisterMode}
            />
            <Grid container> {infoAction}</Grid>
            <Grid container justify="center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                onChange={value => console.log(value)}
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
              {isRegisterMode ? 'Zarejestruj się' : 'Zaloguj się'}
            </Button>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

export default memo(AuthPageComponent);
