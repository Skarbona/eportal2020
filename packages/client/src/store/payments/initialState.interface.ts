import { AlertTypes, NetworkError } from '../../models/alerts';

export interface PaymentsStateInterface {
  loading: boolean;
  error?: NetworkError;
  alertType?: AlertTypes;
}
