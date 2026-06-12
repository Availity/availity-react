---
title: JSON Viewer
---

Accessible component for rendering JSON data as an explorable tree of expandable detail elements.

[![Version](https://img.shields.io/npm/v/@availity/json-viewer.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/json-viewer)

## Installation

### NPM

```bash
npm install @availity/json-viewer
```

### Yarn

```bash
yarn add @availity/json-viewer
```

## Usage

```jsx
import React from 'react';
import JsonViewer from '@availity/json-viewer';

const Example = () => (
  <JsonViewer
    data={{ foo: { bar: { baz: ['stuff', 'things', 'etc.'] } } }}
    expandAll
  />
);
```

## Props

### `data: Record<string, unknown>`

**Required.** Data to be rendered. Supports most valid JavaScript objects. Some uncommon types (cyclical objects, proxies, symbols as keys) may not be fully supported.

### `expandAll?: boolean`

When `true`, all detail elements render in an open state. **Default:** `false`.

### `listClassNames?: string | string[]`

Class names applied to list elements in the rendered tree.

### `keyClassNames?: string | string[]`

Class names applied to key elements in the rendered tree.

### `summaryClassNames?: string | string[]`

Class names applied to summary elements in the rendered tree.

### `backgroundColor?: string`

A Bootstrap background color utility class. See [Bootstrap docs](https://getbootstrap.com/docs/4.0/utilities/colors/#background-color) for options. **Default:** `'light'`.
