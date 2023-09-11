import { BasicEmailTemplate } from '../../models/emails';
import { Language } from '../../models/languages';

export const checkoutSessionSuccess = (lang: Language): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Twoje zamówienie zostało zarejestrowane.',
        text: 'Twoje zamówienie zostało złożone i jest przetwarzane. Poinformujemy Cię o jego zakończeniu.',
      };
    default:
      return {
        subject: 'Your order has been registered.',
        text: 'Your order has been placed and is being processed. We will inform you when it is completed.',
      };
  }
};

export const successfullyPayment = (lang: Language): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Twoja płatność została zrealizowana.',
        text: 'Płatność została zarejestrowana i zaakceptowana przez system. Niedługo będziesz miał dostęp do konta PREMIUM.',
      };
    default:
      return {
        subject: 'Your payment has been processed.',
        text: 'The payment has been registered and accepted by the system. You will soon have access to your PREMIUM account.',
      };
  }
};

export const failedPayment = (lang: Language): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Twoja płatność została odrzucona.',
        text: 'Proszę spróbuj ponownie za chwilę. Sprawdź stan konta bankowego i w razie problem skontaktuj się z nami.',
      };
    default:
      return {
        subject: 'Your payment has been declined.',
        text: 'Please try again in a moment. Check your bank account balance and contact us if there is a problem.',
      };
  }
};

export const account24hActivation = (lang: Language, date: string): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Konto PREMIUM na 24h zostało aktywowane.',
        text: `Twoje konto będzie ważne 24h do: ${date}.`,
      };
    default:
      return {
        subject: 'The PREMIUM account for 24 hours has been activated.',
        text: 'Your account will be valid for 24 hours until: ${date}.',
      };
  }
};

export const account1montActivation = (lang: Language, date: string): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Konto PREMIUM na 1 miesiąc zostało aktywowane.',
        text: `Twoje konto będzie ważne 1 miesiąc do: ${date}.`,
      };
    default:
      return {
        subject: 'The PREMIUM account for 1 month has been activated.',
        text: 'Your account will be valid for 1 month until: ${date}.',
      };
  }
};

export const subscriptionRemoval = (lang: Language): BasicEmailTemplate => {
  switch (lang) {
    case Language.PL:
      return {
        subject: 'Usunąłeś swoją subskrypcje PREMIUM.',
        text: `Twoje konto będzie ważne do końca wykupionego pakietu PREMIUM.`,
      };
    default:
      return {
        subject: 'You have deleted your PREMIUM subscription.',
        text: 'Your account will be valid until the end of the purchased PREMIUM package.',
      };
  }
};
