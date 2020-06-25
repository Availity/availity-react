---
title: Getting Started
summary: List Group Item with some Availity flair
---

## Installation

```bash
npm install @availity/list-group-item --save
```

## Example

```jsx live=true viewCode=true
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <ListGroup>
    <ListGroupItem>Item</ListGroupItem>
    <ListGroupItemStatus>Item2</ListGroupItemStatus>
  </ListGroup>
</div>;
```
