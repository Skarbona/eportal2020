import { PageTypes } from '../../../../models/pageTypes';

export interface ErrorHandlerInterface {
  type: PageTypes;
  error: Error | boolean;
}
