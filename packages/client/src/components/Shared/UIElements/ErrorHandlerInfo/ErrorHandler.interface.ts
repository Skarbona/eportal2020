import { PageTypes } from '../../../../models/page-types';

export interface ErrorHandlerInterface {
  type: PageTypes;
  error: Error | boolean;
}
