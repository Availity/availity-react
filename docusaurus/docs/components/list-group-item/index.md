---
title: Getting Started
---

List Group Item with some Availity flair

[![Version](https://img.shields.io/npm/v/@availity/pagination.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/pagination)

### Installation

npm

```bash
npm install @availity/list-group-item --save
```

Yarn

```bash
yarn add @availity/list-group-item
```

### Example

```jsx
import React from 'react';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';

const Example = () => (
  <ListGroup>
    <ListGroupItem>Item</ListGroupItem>
    <ListGroupItemStatus>Item2</ListGroupItemStatus>
  </ListGroup>
);
```
