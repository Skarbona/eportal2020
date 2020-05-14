import { ErrorTypes, NetworkError } from '../../models/errors';

export enum PageNames {
  Home = 'home',
  PrivacyPolicy = 'privacy-policy',
  Rules = 'rules',
}

export interface SinglePageData {
  content: {
    title: string;
    content: string;
  };
  slug?: string;
}

export interface PagesStateInterface {
  page: {
    [PageNames.Home]?: SinglePageData;
    [PageNames.PrivacyPolicy]?: SinglePageData;
    [PageNames.Rules]?: SinglePageData;
  };
  error?: NetworkError;
  errorType?: ErrorTypes;
  loading?: boolean;
}
