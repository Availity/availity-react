# @availity/breadcrumbs

> Availity breadcrumbs

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

##### Usage

```javascript
import React from 'react';
import Breadcrumbs from '@availity/breadcrumbs';
// ... 
<Breadcrumbs active="Payer Space" crumbs={[{name: 'Grand Parent', url: '/grand-parent'}, {name: 'Parent', url: '/parent'}, ]} />
// ...
```