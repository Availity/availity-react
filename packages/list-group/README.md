# @availity/list-group

> List Group with some Availity flair

[![Version](https://img.shields.io/npm/v/@availity/list-group.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/list-group)

## Installation

```bash
npm install @availity/list-group --save
```

### Usage

```javascript
import React from 'react';
import ListGroup from '@availity/list-group';
// ... 
<ListGroup>
  {/* ... */}
</ListGroup>
// ...
```

#### ListGroup (Default export)
Availity's ListGroup which can feature Cards and Selectable items

##### Props

- **`cards`**: Boolean. Optional. Triggers the items (children) to appear as cards
- **`selectable`**: Boolean. Optional. Triggers the items (children) to appear selectable when hovered
- **`tag`**: The tag/component which this component outputs. Default `ul`

##### ListGroup Usage

```javascript
import React from 'react';
import ListGroup from '@availity/list-group';
import { ListGroupItem } from 'reactstrap';
// ... 
<ListGroup selectable cards>
  <ListGroupItem>Item</ListGroupItem>
  <ListGroupItem>Item</ListGroupItem>
  <ListGroupItem>Item</ListGroupItem>
</ListGroup>
// ...
```