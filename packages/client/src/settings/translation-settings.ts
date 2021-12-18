import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE, NODE_ENV } from '../constants/envs';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'pl'];

// @ts-ignore: TODO resolve. Issue appears after libraries were updated
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: LANGUAGE || 'en',
    fallbackLng,
    debug: NODE_ENV === 'development',
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
