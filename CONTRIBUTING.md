# Contributing

🙏🙏🙏

## Start Here

If you're here, I'm assuming that you've found this library useful! That's wonderful and it warms my soul 😊.

Unlike many libraries, this one is primarily a [_personal library_](https://psas.dev/purely-personal/). It exists to simplify my efforts to maintain various mobile apps including [Binary Clock](https://github.com/thehale/BinaryClock), [Habit Sync for Todoist](https://github.com/thehale/HabitSync-for-Todoist), and [Speedcuber Timer](https://github.com/SpeedcuberOSS/speedcuber-timer). Broad utility is only a goal insofar as it makes my life easier when maintaining my apps.
 
If you choose to offer contributions, please keep in mind the following:
  - I can/will make breaking API changes whenever I want -- this library exists to serve my apps.
  - You, however, cannot change the APIs -- don't break my apps! 🙏
  - Well-written, automated tests are really important to me -- contributions that include good tests are taken much more seriously than those without.
  - Eventually, I want to offer my apps on Windows and MacOS. 
     - In general, adding dependencies (particularly native dependencies) is strongly discouraged. Anything Expo\* is strictly prohibited -- don't block my aspirations! 🙏
     - Limit yourself to boring old JavaScript/TypeScript and the [core React Native components and APIs](https://reactnative.dev/docs/components-and-apis). e.g. use [`Animated`](https://reactnative.dev/docs/animated), and [`StyleSheet`](https://reactnative.dev/docs/stylesheet) instead of any third-party library/tool -- don't bloat my apps! 🙏
    
     <sub>\* Expo is a great tool for many projects -- including this library's [example app](example/package.json) -- but I prefer the control/flexibility of running bare React Native. Thus this library cannot _depend_ on anything Expo.</sub>
 
Thank you for being considerate of my goals with this library! I look forward to seeing your contributions, be they large or small!

## Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

To get started with the project, make sure you have the correct version of [Node.js](https://nodejs.org/) installed. See the [`.nvmrc`](./.nvmrc) file for the version used in this project.

Run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> Since the project relies on Yarn workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development without manually migrating.

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "ExpressiveExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

To run the example app on Web:

```sh
yarn example web
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module.
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn`: setup project by installing dependencies.
- `yarn typecheck`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
