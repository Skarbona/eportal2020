export const checkIfTokenIsValid = (token: string, expirationDate: Date): boolean =>
  token?.length && expirationDate?.getTime() > new Date().getTime();
