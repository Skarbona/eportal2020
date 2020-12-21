module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFiles: ['./setupTests.ts'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
