## Contributing

This is a monorepo managed using [lerna](https://github.com/lerna/lerna) in independent mode (each package is versioned and published individually).

## Installation

Ensure [yarn](https://yarnpkg.com/lang/en/) is installed

```bash
npm install -g yarn
```

Install the dependencies

```bash
yarn install
```

The first install might take a while. All subsequent installs should proceed more quickly.

## Adding a New Package

```bash
yarn new
```

## Hooks

This repo requires the components to be built for testing, linting, and releasing to work properly. Accordingly, we try to handle this for you whenever possible.

### pretest

Run `yarn build:components` to make sure `jest` is running tests against the latest code.

### prerelease

Run `yarn build:components` to create the `dist` where the packaged code can be accessed.

### postinstall

Run `yarn build:components`, after packages are installed, to build the components. This will ensure they are up to date for local use.

## Commits

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be one of the un-prefixed names of the packages under `./packages/`. If a commit applies to multiple packages, leave out the scope.

For example, here is what the commit message would like when fixing a null-checking error in the [icon](../packages/icon) package:

```bash
git commit -m "fix(icon): check for null before doing the action"
```

The commit messages in this repository are important for two main reasons. 1) The `type` (feat, fix, build, etc) is used to determine how to bump the version when publishing. 2) The commits with types `feat` and `fix` will show up in the `CHANGELOG.md` for the given package.

## Canary Releases

Canary Releases can be used to test changes without impacting the current `latest` tag.

```bash
lerna publish -c
```
