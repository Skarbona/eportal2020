import { Color } from '@material-ui/lab/Alert';
import i18n from '../settings/translation-settings';

export interface NetworkError extends Error {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

export enum ErrorTypes {
  FetchingCategories = 'FetchingCategories',
  FetchingPosts = 'FetchingPosts',
  WrongLoginInputs = 'WrongLoginInputs',
  WrongRegisterInputs = 'WrongRegisterInputs',
  ValidationError = 'ValidationError',
  ServerError = 'ServerError',
  CannotSetUserDataWarning = 'CannotSetUserDataWarning',
  UnAuthorized = 'UnAuthorized',
}

export enum ErrorsSize {
  Big = 'big',
  Snackbar = 'snackbar',
}

interface ErrorHandlingMapInterface {
  message: string;
  header: string;
  severity: Color;
  size: ErrorsSize;
}

export const ErrorHandlingMap = new Map<ErrorTypes, ErrorHandlingMapInterface>();

i18n.on('languageChanged', (_language) => {
  ErrorHandlingMap.set(ErrorTypes.FetchingCategories, {
    header: i18n.t('Fetching error'),
    message: i18n.t('Sorry but we cannot fetch categories'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.FetchingPosts, {
    header: i18n.t('Fetching error'),
    message: i18n.t('Sorry but we cannot fetch posts'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.WrongLoginInputs, {
    header: i18n.t('Wrong Inputs'),
    message: i18n.t('Your email or password are incorrect'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.WrongRegisterInputs, {
    header: i18n.t('User exist'),
    message: i18n.t('User with this email or userName already exist'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.ValidationError, {
    header: i18n.t('Validation error'),
    message: i18n.t('If you use form website this error should not appear'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.ServerError, {
    header: i18n.t('Server cannot response'),
    message: i18n.t('This is probably issue with Internet connection or server'),
    size: ErrorsSize.Big,
    severity: 'error',
  });

  ErrorHandlingMap.set(ErrorTypes.CannotSetUserDataWarning, {
    header: i18n.t('We cannot save user data'),
    message: i18n.t('This is probably issue with Internet connection or server'),
    size: ErrorsSize.Snackbar,
    severity: 'warning',
  });

  ErrorHandlingMap.set(ErrorTypes.UnAuthorized, {
    header: i18n.t('Your permissions are not valid'),
    message: i18n.t('Please login again'),
    size: ErrorsSize.Big,
    severity: 'error',
  });
});
