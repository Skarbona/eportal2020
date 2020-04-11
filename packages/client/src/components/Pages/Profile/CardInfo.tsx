import React, { FC, memo, Fragment } from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';

interface Props {
  name: string;
  email: string;
}

export const CardInfoComponent: FC<Props> = ({ name, email }) => {
  return (
    <Fragment>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-user">
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {email}
          </Typography>
        </CardContent>
      </Card>
      <Card className="profile__card-info primary-gradient-bg">
        <CardContent className="card-actions">
          <Button>
            <span className="counter">10</span>
            <span className="text">Added Tasks</span>
          </Button>
          <Button>
            <span className="counter">5</span>
            <span className="text">Approved Tasks</span>
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default memo(CardInfoComponent);
