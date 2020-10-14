---
title: <ListGroupItemStatus />
summary: ListGroupItem with an optional status badge and colors for the card and badge.
---

## Example

```jsx  viewCode=true
import ListGroup from '@availity/list-group';
import { ListGroupItemStatus } from '@availity/list-group-item';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <ListGroup cards>
    <ListGroupItemStatus
      titleContent="Hello World"
      badge="Hello World"
      color="primary"
    >
      Some Lorem Ipsum Content
    </ListGroupItemStatus>
    <ListGroupItemStatus badge="Item 2" color="danger">
      Item 2
    </ListGroupItemStatus>
    <ListGroupItemStatus color="success">Item 3</ListGroupItemStatus>
  </ListGroup>
</div>;
```

## Props

### `titleContent?: ReactNode`

When present, adds a title on the same level as the badge. If of type `string` then defaults to using `<span>` tag.

### `color?: string`

Set the color for the border and the badge. **Default:** `"info"`.

### `badge?: ReactNode`

If a String, the text to render inside of the `<Badge />`. If an Object, expects `text` (String) and `color` (String) properties. `text` is the text to render inside the badge. `color` is the color of the badge.
