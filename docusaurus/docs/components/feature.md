---
title: Feature
---

Component for conditionally rendering content based on whether a feature is enabled.

[![Version](https://img.shields.io/npm/v/@availity/feature.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/feature)

## Installation

### NPM

```bash
npm install @availity/feature
```

### Yarn

```bash
yarn add @availity/feature
```

## Usage

```jsx
import React from 'react';
import Feature from '@availity/feature';

const Example = () => (
  <Feature features="AV-1234" whenDisabled={<p>Feature not available</p>}>
    <p>This content only shows when the feature is enabled.</p>
  </Feature>
);
```

### AND / OR Logic

The `features` prop supports complex logic:

```jsx
// OR - any feature enabled shows children
<Feature features={['AV-1234', 'AV-5678']}>...</Feature>

// AND - all features in nested array must be enabled
<Feature features={[['AV-1234', 'AV-5678']]}>...</Feature>

// Mixed - 'AV-1234' OR ('AV-5678' AND 'AV-9012')
<Feature features={['AV-1234', ['AV-5678', 'AV-9012']]}>...</Feature>
```

## Props

### `features: string | Array`

**Required.** Feature ID string or array of feature IDs. Nested arrays use AND logic; top-level array items use OR logic.

### `loader?: boolean | ReactNode`

When `true`, renders a loading indicator while loading. When a node, renders that node while loading. When `false`, renders nothing while loading. **Default:** `true`.

### `whenDisabled?: ReactNode`

Content to render when the feature is disabled.

### `children?: ReactNode`

Content to render when the feature is enabled.

### `negate?: boolean`

When `true`, inverts the behavior — renders `children` when the feature is disabled and `whenDisabled` when the feature is enabled.

## isFeatureEnabled

Utility function that checks whether features are enabled. Can be used outside of React components.

```js
import { isFeatureEnabled } from '@availity/feature';

const enabled = await isFeatureEnabled('AV-1234');
```

:::note
The `features.json` file acts as a **disable-list**. Features that appear in `features.json` are considered disabled. Features _not_ present in the file are treated as enabled. If `features.json` fails to load or is empty, all features are considered enabled.
:::
