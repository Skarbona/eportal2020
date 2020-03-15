import React, { FC } from 'react';
import { Container, Typography } from '@material-ui/core';

import './App.scss';
import { Form } from '../Form/Form';

// TODO: Add Bem Support
const App: FC<{}> = () => {
  return (
    <div className="skarbona-events">
      <Container component="main" maxWidth="sm" className="main">
        <Typography component="h1" variant="h2" color="primary" className="main-header">
          Skarbona Events
        </Typography>
        <Form />
      </Container>
    </div>
  );
};

export default App;
