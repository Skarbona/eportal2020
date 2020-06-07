import * as CNST from '../constants/envs';

export default (): Error | void => {
  if (
    !CNST.DB_USER ||
    !CNST.DB_PASS ||
    !CNST.DB_NAME ||
    !CNST.DB_HOST ||
    !CNST.JWT_ACCESS_TOKEN ||
    !CNST.JWT_REFRESH_TOKEN ||
    !CNST.PORTAL_ADRESS ||
    !CNST.EMAIL_HOST ||
    !CNST.EMAIL_USER ||
    !CNST.EMAIL_PASS
  ) {
    throw new Error(
      `Not all required envs defined! 
        DB_USER: ${!!CNST.DB_USER}, 
        DB_PASS: ${!!CNST.DB_PASS},
        DB_NAME: ${!!CNST.DB_NAME}, 
        DB_HOST: ${!!CNST.DB_HOST},
        JWT_ACCESS_TOKEN: ${!!CNST.JWT_ACCESS_TOKEN},
        JWT_REFRESH_TOKEN: ${!!CNST.JWT_REFRESH_TOKEN},
        PORTAL_ADRESS: ${!!CNST.PORTAL_ADRESS},
        EMAIL_HOST: ${!!CNST.EMAIL_HOST},
        EMAIL_USER: ${!!CNST.EMAIL_USER},
        EMAIL_PASS: ${!!CNST.EMAIL_PASS}`,
    );
  }

  if (CNST.NODE_ENV === 'test' && (!CNST.ADMIN_TEST_USER || !CNST.ADMIN_TEST_PASS)) {
    throw new Error(`Not all required envs defined for Test env! 
        ADMIN_TEST_USER: ${!!CNST.ADMIN_TEST_USER}, 
        ADMIN_TEST_PASS: ${!!CNST.ADMIN_TEST_PASS},`);
  }
};
