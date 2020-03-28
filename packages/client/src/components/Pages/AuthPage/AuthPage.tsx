import React, { FC, memo, useState } from 'react';
import { Container, Link, Typography } from '@material-ui/core';

import Login from './Login';
import Register from './Register';

export const AuthPageComponent: FC<{}> = () => {
  const [isRegisterMode, setMode] = useState<boolean>(true);
  const setModeHandler = () => setMode(prevState => !prevState);

  const infoAction = isRegisterMode ? (
    <Typography>
      Posiadasz już konta? <Link onClick={setModeHandler}>Zaloguj się</Link>
    </Typography>
  ) : (
    <Typography>
      Nie posiadasz konta? <Link onClick={setModeHandler}>Zarejestruj się</Link>
    </Typography>
  );

  return (
    <Container className="game">
      {isRegisterMode ? <Register /> : <Login />} {infoAction}
    </Container>
  );
};

export default memo(AuthPageComponent);
