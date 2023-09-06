import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CancelOutlined as CancelIcon } from '@material-ui/icons';
import { usePremiumUser } from '../../../hooks/usePremiumUser';
import { getUserTransactions } from '../../../store/payments/thunks/getUserTransactions';
import { useReduxDispatch } from '../../../store/helpers';
import { UserTransactions } from '../../../../../service/src/models/shared-interfaces/payments';
import { getDateWithTime } from '../../../utils/date';
import { cancelTransaction } from '../../../store/payments/thunks/cancelSubscribtion';
import { reFetchUserData } from '../../../store/user/thunks/refetchUserData';

export const PremiumUserSection: FC = () => {
  const dispatch = useReduxDispatch();
  const { currentPeriodEnd, isMonthPlan, isDayPlan, cancelledSubscription } = usePremiumUser();
  const [userTransaction, setUserTransaction] = useState<UserTransactions[]>([]);
  const { t } = useTranslation();

  const handleGetUserTransactions = useCallback(async () => {
    const data = await dispatch(getUserTransactions());
    setUserTransaction(data ?? []);
  }, [dispatch]);

  const handleCancelSubscription = useCallback(async () => {
    const success = await dispatch(cancelTransaction());
    if (success) {
      setTimeout(() => {
        dispatch(reFetchUserData());
      }, 2000);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetUserTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={5}>
        <Card className="primary-gradient-bg">
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h4" component="h2">
              {isMonthPlan && t('Monthly Subscription')}
              {isDayPlan && t('24h Subscription')}
            </Typography>
            {currentPeriodEnd && (
              <Typography variant="body2" color="textSecondary" component="p">
                {t('Active to')}: {getDateWithTime(currentPeriodEnd)}
              </Typography>
            )}
            {cancelledSubscription && (
              <>
                <Typography gutterBottom variant="h4" component="h2">
                  {t('Subscription is cancelled')}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {t('You can use this subscription to the end of period')}
                </Typography>
              </>
            )}
          </CardContent>
          {!cancelledSubscription && isMonthPlan && (
            <CardContent style={{ textAlign: 'center' }}>
              <Button
                fullWidth
                onClick={handleCancelSubscription}
                className="cancel-button"
                variant="contained"
                size="small"
                startIcon={<CancelIcon />}
              >
                {t('Cancel subscription')}
              </Button>
              <Typography variant="body2" color="textSecondary" component="p">
                {t('You can cancel this subscription at any time.')}
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
      <Grid item sm={12} md={7} className="profile__grid-item">
        {userTransaction.length > 0 && (
          <Card className="primary-gradient-bg">
            <CardContent style={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h4" component="h2">
                {t('Payment History')}
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('Amount')}</TableCell>
                      <TableCell align="right">{t('Transaction Date')}</TableCell>
                      <TableCell align="right">{t('Status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userTransaction.map((transaction) => {
                      const transactionDate = transaction.created
                        ? new Date(transaction.created * 1000)
                        : '';
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell component="th" scope="row">
                            {transaction.amount ? transaction.amount / 100 : '-'} PLN
                          </TableCell>
                          <TableCell align="right">
                            <div>{transactionDate ? getDateWithTime(transactionDate) : '-'}</div>
                          </TableCell>
                          <TableCell align="right">{transaction.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};
