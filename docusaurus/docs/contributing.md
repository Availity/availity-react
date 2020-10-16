---
title: Contributing
---

This is a monorepo managed using [lerna](https://github.com/lerna/lerna) in independent mode (each package is versioned and published individually).

### Installation

Ensure [yarn](https://yarnpkg.com/lang/en/) is installed

```bash
npm install -g yarn
```

Install the dependencies

```bash
yarn install
```

All subsequent installs should be quick after the first one.

### Adding a New Package

```bash
yarn new
```

### Commits

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should one of un-prefixed names of the packages under `./packages/`. If a commit applies to multiple packages, leave out the scope.

### Canary Releases

Useful for testing out changes. Canary releases do not impact the current `latest` tag version.

```bash
lerna publish -c
```
