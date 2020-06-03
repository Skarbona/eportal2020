[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![codecov](https://codecov.io/gh/Skarbona/eportal2020/branch/master/graph/badge.svg?flag)](https://codecov.io/gh/Skarbona/eportal2020)

# Local Development

## Page example with dummy data:

https://game.filip-sokolowski.pl/

## How to start ?

1. Run `npm i`
2. Run `lerna bootstrap`. If command not working install lerna globally `npm i -g lerna` or run scripts from main package.json.

## Service

Service is an API build in node.js + express + mongoose. Is is responsible for handling all API requests.

1. Create MongoDB Database (locally, Atlas, AWS etc..)
2. Set Envs in .env file (check .env-default file for reference).
3. Set Envs for Tests: add .env-test file.

## Client

Client App is build in React. It is responsible for UI.

1. Set Envs in .env file (check .env-default file for reference).

## Database

Required Database must be MongoDB.

1. Create collections: pages, categories, posts. Check db directory for dummy data.

## How to develop?

1. Run `lerna run start`
2. Or access specific package folder and run `npm run start`

## How to test?

1. Run `lerna run test`
2. Or access specific package folder and run `npm run test`
