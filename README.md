# Step-Universal-React

Universal react app with webpack bundling, and the following features:

- i18n using react-intl
- routing using react-router v4
- SSR
- PWA with a service worker
- Env injection
- ESLint
- SASS
- Redux + Redux devtools
- Testing: jest & enzyme
- Ant.design UI Framework

The following npm scripts are provided:

- `$ npm run test`:
  Run all tests in watch mode. Use with ENV option CI=true to test only once.

- `$ npm run build`:
  Create a static build, output in `/build/` folder.
  If ENV variable NODE_ENV is set to 'production', the build will be optimized, minified, gzipped, etc..

- `$ npm run start`:
  Start webpack-dev-server with hot-reloading

- `$ npm run lint`:
  Lint JS code

- `$ npm run server`:
  Start a production-ready express server with SSR

## App configuration

File `/config.json` stores all app related data.

Files inside `/public/` folder can be modified to fit the needs of the app: favicon, index for metas, app manifest..

## i18n

Implemented with [react-intl](https://github.com/yahoo/react-intl)

Internationalization files are under `i18n/[locale].json` file. To add new
languages, one should create the file in there, and add them to the
application in 2 points:

- `/server/universal.js`
- `/client/index.js`


## TESTING

Implemented with jest + enzyme

Run all tests in watch mode:
```
$ npm run test
```

Run all tests in single/CI mode:
```
$ CI=true npm run test
```

Get test coverage report:
```
$ npm run test -- --coverage
```

## UI

Using Ant Design React. Supports all the modern browsers and IE9+.
[getting started](https://ant.design/docs/react/getting-started)

You need to provide es5-shim and es6-shim and other polyfills for IE browsers.


## ENVIRONMENT

Using [dotenv](https://github.com/motdotla/dotenv)

### Env variables:

```sh
NODE_ENV= development | production  --> production to minify/gzip assets
VERBOSE=true      --> see detailed build compilation output
DEBUG='express:*' --> log all requests from webpack-dev-server express middleware
API_URL='someapi.url.com'
CI=true --> 'if we are in CI, tests will run in single mode, no watch'
```

### Env files:

Process will look for these files:

* `.env`: Default.
* `.env.local`: Local overrides. **This file is loaded for all environments except test.**
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

* `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)



