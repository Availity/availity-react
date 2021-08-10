---
title: <PaginationControls />
---

The controls for the pagination

### Example

```jsx
import React from 'react';
import { PaginationControls } from '@availity/pagination';

const Example = () => <PaginationControls directionLinks />;
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-pagination--controls"> Storybook</a>

### Props

#### `directionLinks?: boolean`

If enabled, shows next and previous arrows on the "Next" and "Back" buttons.

#### `autoHide?: boolean`

If enabled and there are no items, the component is hidden.

#### `pageRange?: number`

The number of pages to display at a time. **Default**: `5`.

#### `marginPages?: number`

The number of pages to display on the ends when there are pages outside of the page range. **Default:** `2`.

#### `breakLabel?: boolean`

When `true` an ellipse is displayed when there are more pages outside of the page range.

#### `listClassName?: string`

Add bootstrap styles to list element.

