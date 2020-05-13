declare namespace Express {
  import { UserType } from './src/models/shared-interfaces/user';
  export interface Request {
    userData?: {
      userId: string;
      email: string;
      type: UserType;
    };
  }
}
