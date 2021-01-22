---
title: <ListGroupItem /> ( Default Export )
---

Availity's ListGroup, which can feature Cards and Selectable items

### Example

```jsx
import React from 'react';
import ListGroup from '@availity/list-group';
import ListGroupItem from '@availity/list-group-item';

const Example = () => (
  <ListGroup cards>
    <ListGroupItem borderColor="primary" color="primary">
      Item 1
    </ListGroupItem>
    <ListGroupItem borderColor="secondary" color="secondary">
      Item 2
    </ListGroupItem>
    <ListGroupItem borderColor="danger" color="danger">
      Item 3
    </ListGroupItem>
  </ListGroup>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-list-group-item--default"> Storybook</a>

### Props

#### `borderColor?: string`

The border color to display on the left of the item. Uses Availity UI Kit variants. Must be used within a `ListGroup` from `@availity/list-group` with the `cards` prop set to `true`

#### `color?: string`

Adds a contextual background color to the item. Uses Availity UI Kit variants.

#### `tag?: React.ComponentType | string`

The tag to use in the list group item. **Default:** `<li>`
