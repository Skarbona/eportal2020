import React, { FC, memo } from 'react';
import { Button, Grid } from '@material-ui/core';
import { PlayArrow, Info } from '@material-ui/icons';

export interface Props {
  isFormValid: boolean;
}

export const StartButtonComponent: FC<Props> = ({ isFormValid }) => {
  return (
    <Grid container className="start-button">
      <Button
        size="large"
        color="primary"
        type="submit"
        variant="contained"
        disabled={!isFormValid}
        startIcon={isFormValid ? <PlayArrow /> : <Info />}
      >
        {isFormValid ? 'Rozpocznij Grę!' : 'Musisz zaznaczyć przynajmniej 10 kategorii'}
      </Button>
    </Grid>
  );
};

export default memo(StartButtonComponent);
