import { checkSchema } from 'express-validator';
import { FormValues } from '../models/shared-interfaces/user';
// TODO: make multilanguage

const userName = {
  isLength: {
    options: { min: 4, max: 20 },
    errorMessage: 'Username must include between 4 and 20 characters',
  },
  matches: {
    options: /[`~,.<>;':"/[\]|{}()=_+-]/,
    errorMessage: 'Username cannot include some of special characters',
    negated: true,
  },
};

const email = {
  isEmail: {
    errorMessage: 'Please provide valid email',
  },
};

const passwordHandler = (optional: boolean) => ({
  custom: {
    options: (value: string) => {
      if (!value && optional) {
        return true;
      }
      if (!/^(.*[0-9].*)$/.test(value)) {
        throw new Error('Password must include at least one number');
      } else if (!/^(.*[A-Z].*)$/.test(value)) {
        throw new Error('Password must include at least one big letter');
      } else if (!/^(.*[a-z].*)$/.test(value)) {
        throw new Error('Password must include at least one small letter');
      } else if (!/^(.{8,20})$/.test(value)) {
        throw new Error('Password must include between 8 and 30 characters');
      }
      return true;
    },
  },
});

const userId = {
  isLength: {
    options: { min: 8 },
    errorMessage: 'userId must include at least 8 characters',
  },
};

const gameDefaultsHandler = (optional: boolean) => ({
  custom: {
    options: (value: FormValues) => {
      if (!value && optional) {
        return true;
      }

      if (
        !value?.names ||
        !value.names.she ||
        !value.names.he ||
        value.names.she.length < 1 ||
        value.names.he.length < 1
      ) {
        throw new Error('Names must include at least one letter');
      }
      if (!value.place?.length) {
        throw new Error('Place cannot be empty');
      }
      if (
        !Array.isArray(value.catsQuery?.catsInclude) ||
        !Array.isArray(value.catsQuery?.catsExclude)
      ) {
        throw new Error('catsInclude and catsExclude have to be Arrays');
      }

      if (
        !value.levels?.level1 ||
        value.levels?.level1 <= 0 ||
        !value.levels?.level2 ||
        value.levels?.level2 <= 0 ||
        !value.levels?.level3 ||
        value.levels?.level3 <= 0
      ) {
        throw new Error('Levels must bigger than 0');
      }
      if (!value.time?.type || !Array.isArray(value.time?.value)) {
        throw new Error('Time type and value have to be valid');
      }
      return true;
    },
  },
});

const password = passwordHandler(false);
const optionalPassword = passwordHandler(true);
const gameDefaultsOptional = gameDefaultsHandler(true);

export const signUp = checkSchema({ userName, email, password });
export const login = checkSchema({ email, password });
export const getUserData = checkSchema({});
export const updateUser = checkSchema({
  password: optionalPassword,
  gameDefaults: gameDefaultsOptional,
});
