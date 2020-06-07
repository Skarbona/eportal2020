import { BasicEmailTemplate } from '../../models/emails';
import { Language } from '../../models/languages';

import { PORTAL_ADRESS } from '../../constants/envs';

export const resetPasswordTemplate = (token: string, lang: Language): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Link do resetu hasła',
        text: `Dostałeś tego emaila ponieważ użyłeś funkcji resetowanie do dla swojego konta.\n\nProszę kliknij na link poniżej (lub go skopiuj) aby zresetować hasło do swojego konta:\n\n${PORTAL_ADRESS}/reset/${token} \n\nJeśli tego jednak nie zrobiłeś, to zignoruj tego maila, a hasło nie zostanie zmienione. \n`,
      };
    default:
      return {
        subject: 'Link to password reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for you account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${process.env.PORTAL_ADRESS}/reset/${token} \n\nIf you did not request this, please ignore this email and your password will remain unchanged. \n`,
      };
  }
};
