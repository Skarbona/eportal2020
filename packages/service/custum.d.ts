declare namespace Express {
  export interface Request {
    userData?: {
      userId: string;
      email: string;
    };
  }
}
