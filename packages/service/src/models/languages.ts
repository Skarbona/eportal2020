import { LANGUAGE } from '../constants/envs';

export enum Language {
  PL = 'pl',
  EN = 'en',
}

export const LanguageApp = LANGUAGE === 'en' ? Language.EN : Language.PL;
