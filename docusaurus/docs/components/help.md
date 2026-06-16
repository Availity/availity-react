---
title: Help
---

Help wrapper for Oxygen Learning Docs on the Portal.

[![Version](https://img.shields.io/npm/v/@availity/help.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/help)

## Installation

### NPM

```bash
npm install @availity/help
```

### Yarn

```bash
yarn add @availity/help
```

## Usage

```jsx
import React from 'react';
import HelpProvider, { Help } from '@availity/help';

const Example = () => (
  <HelpProvider>
    <Help type="provider" id="1234-5678-9101-1213">
      Some Content You May need documentation for.
    </Help>
  </HelpProvider>
);
```

## Props

### HelpProvider

Context provider that must wrap any `Help` components. Manages help state and sends messages to the portal navigation.

#### `children: ReactNode`

**Required.** The child components.

### Help

Registers a help topic when mounted and unregisters when unmounted.

#### `id: string`

**Required.** The page level help ID.

#### `type?: 'vendor' | 'provider' | 'payer'`

The page level help type. **Default:** `'vendor'`.

#### `children?: ReactNode`

Content to render inside the Help wrapper.

## useHelp

Hook that registers a help topic with the HelpProvider context. Must be used within a `HelpProvider`.

```jsx
import React from 'react';
import HelpProvider, { useHelp } from '@availity/help';

const MyComponent = () => {
  useHelp({ type: 'provider', id: '1234-5678-9101-1213' });

  return <div>My content with help registered</div>;
};

const App = () => (
  <HelpProvider>
    <MyComponent />
  </HelpProvider>
);
```

### Parameters

#### `{ type, id }: { type: 'vendor' | 'provider' | 'payer'; id: string }`

Object containing the help type and ID to register.

### Return Value

```ts
type HelpCtx = {
  addHelp: (data: HelpObject) => void;
  removeHelp: (id: string) => void;
  help: HelpObject | undefined;
};
```

## constants

Exported event name constants used internally for portal navigation messaging.

```jsx
import { constants } from '@availity/help';

// constants.SET_HELP === 'nav:help:set'
// constants.RESET_HELP === 'nav:help:reset'
```
