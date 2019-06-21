# @availity/breadcrumbs

> Availity breadcrumbs

[![Version](https://img.shields.io/npm/v/@availity/breadcrumbs.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/breadcrumbs)

## Installation

```bash
npm install @availity/breadcrumbs --save
```

### Usage

```javascript
import React from 'react';
import Breadcrumbs from '@availity/breadcrumbs';
// ... 
<Breadcrumbs active="Payer Space" />
// ...
```

#### Breadcrumbs (Default export)
Breadcrumbs showing the ancestor pages and the current active page

##### Props

- **`active`**: String. Required. The name of the active page (the page the user is currently on).
- **`crumbs`**: Array of Objects contains `name` (String) and `url` (string) properties. Optional. The ancestor pages.
- **`emptyState`**: String. Optional. The value which will be display when the active page or an ancestor does not have a value. Default `&hellip;` (&hellip;)
- **`children`**: BreadcrumbItem Components. Optional. The children must be reactstrap BreadcrumbItem components

##### Usage

```javascript
import React from 'react';
import Breadcrumbs from '@availity/breadcrumbs';
// ... 
<Breadcrumbs active="Payer Space" crumbs={[{name: 'Grand Parent', url: '/grand-parent'}, {name: 'Parent', url: '/parent'}, ]} />
// ...
```

Example with custom child breadcrumbs. This would create the Breadcrumbs "Home > Custom Bread Crumb > Current Page"
```javascript
import React from 'react';
import Breadcrumbs from '@availity/breadcrumbs';
import { BreadcrumbItem } from 'reactstrap';
// ...
<Breadcrumbs
  emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
  active={text('Active Page', 'Current Page')}
>
  <BreadcrumbItem>
    <div>Custom Bread Crumb</div>
  </BreadcrumbItem>
</Breadcrumbs>
// ...
```

