---
title: Hooks
---

Compilation of custom hooks that are common in our apps.

[![Version](https://img.shields.io/npm/v/@availity/hooks.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/hooks)

## Installation

### NPM

```bash
npm install @availity/hooks
```

### Yarn

```bash
yarn add @availity/hooks
```

## Available Hooks

| Hook                                         | Description                             |
| -------------------------------------------- | --------------------------------------- |
| [useCurrentUser](use-current-user)           | Returns the current user                |
| [useCurrentRegion](use-region)               | Returns the user's current region       |
| [useOrganizations](use-organizations)        | Returns organizations                   |
| [usePermissions](use-permissions)            | Returns user permissions                |
| [useProviders](use-providers)                | Returns providers                       |
| [useMount](use-mount)                        | Runs a function on mount/dismount       |
| [useTimeout](use-timeout)                    | Returns true after a given delay        |
| [useToggle](use-toggle)                      | Returns a toggleable boolean            |
| [useUpdateNav](use-update-nav)               | Syncs route changes with the portal nav |
| [useWindowDimensions](use-window-dimensions) | Returns window height and width         |
| [useEffectAsync](../deprecated/hooks/use-effect-async) | _(Deprecated)_ Async useEffect wrapper  |
