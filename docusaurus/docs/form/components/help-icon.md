---
title: <FieldHelpIcon />
---

FieldHelpIcon is used to add a question mark icon to a Label. It can be clicked by users to bring up more information about that field.

### Example

```jsx
import React from 'react';
import { FieldHelpIcon } from '@availity/form';

const Example = () => (
  <div id="testId">
    Select A Provider <FieldHelpIcon id="provider-help" labelId="1234-6789" />
  </div>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/docs/form-components-form-fieldhelpicon--docs)

### Props

#### `id?: string`

Help topic ID used with the messaging api to determine what content is shown when clicked.

#### `color?: string`

Color of the icon. Default is `primary`.

#### `size?: string`

Size of the Icon. Potential values include "lg", "xl", "1x", "2x", "3x", "4x", "5x". Default is `1x`

#### `labelId?: string`

ID used on the label. Populates the `aria-describedby` property for accessibility.
