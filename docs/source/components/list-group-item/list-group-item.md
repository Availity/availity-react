---
<<<<<<< HEAD
title: ListGroupItem Default Export
=======
title: <ListGroupItem /> ( Default Export )
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
summary: Availity's ListGroup, which can feature Cards and Selectable items
---

## Example

```jsx live=true viewCode=true
import ListGroup from '@availity/list-group';
import ListGroupItem from '@availity/list-group-item';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <ListGroup cards>
    <ListGroupItem borderColor="primary" color="primary">Item 1</ListGroupItem>
    <ListGroupItem borderColor="secondary" color="secondary">Item 2</ListGroupItem>
    <ListGroupItem borderColor="danger" color="danger">Item 3</ListGroupItem>    
  </ListGroup>
</div>
```

## Props

### `borderColor?: string`
The border color to display on the left of the item. Uses Availity UI Kit variants. Must be used within a `ListGroup` from `@availity/list-group` with the `cards` prop set to `true`

### `color?: string`
Adds a contextual background color to the item. Uses Availity UI Kit variants.

### `tag?: React.ComponentType | string`
The tag to use in the list group item. **Default:** `<li>`