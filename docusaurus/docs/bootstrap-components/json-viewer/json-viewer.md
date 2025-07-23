---
title: json-viewer
slug: json-viewer
---

The only component for viewing json.

### Example

```jsx
import React from 'react';
import JsonViewer from '@availity/json-viewer';

const Example = () => {
  return (
    <JsonViewer
      data={{ foo: { bar: { baz: ['stuff', 'things', 'etc.'] } } }}
      expandAll
    />
  );
};
```

## Props

### `data: Record<string, unknown>`

Data to be rendered, can be most valid javascript objects, some uncommon types may not be fully supported - like cyclical objects, proxies, symbols as keys.

### `expandAll?: boolean`

Defaults to false, if true will open all details elements.

### `listClassNames?: string | string[], keyClassNames?: string | string [], summaryClassNames?: string | string[]`

Optional props passed to classnames to style various parts of the rendered tree.

### `backgroundColor?: string`

One of the bootstrap color classes - see https://getbootstrap.com/docs/4.0/utilities/colors/#background-color for options. Defaults to light.
