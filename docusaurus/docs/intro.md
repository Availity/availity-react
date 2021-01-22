---
title: Introduction
slug: /
---

**Availity React is a repo of React components built for web projects on the Availity Portal**.

#### You can browse these docs to help find the React component(s) you're looking to import.

:::note
If you can't find what you are looking for on any of the left sub menus try out the `search bar` at the top of every page that leverages [Algolia](https://www.algolia.com/) to provide lightning fast searches across all of our docs.
:::

## Installation

For this example we'll use the [icon](/components/icon) component.

npm

```bash
npm install @availity/icon --save
```

Yarn

```bash
yarn add @availity/icon
```

## Usage

Import your component and you're good to go.

```jsx
import React from 'react';
import Icon from '@availity/icon';

const Example = () => <Icon name="home" size="3x" color="primary" />;
```

## Supported Browsers

- Internet Explorer 11+
- Google Chrome
- Mozilla Firefox
