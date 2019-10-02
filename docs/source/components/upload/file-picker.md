---
title: <FilePicker />
---

The raw file picker which automatically resets the value of the input, allowing the same file to be selected multiple consecutive files.

## Example

```jsx
import React from 'react';
import { FilePicker } from '@availity/upload';
import { CustomInput } from 'reactstrap';

handleFileSelection = event => {
  const { files } = event.target;
  // do something with the files.
};

<FilePicker tag={CustomInput} onChange={this.handleFileSelection} />;
```

## Props

### `tag?: React.ComponentType | string`

The raw underlying component/element that should be rendered. **Default:** Reactstrap `CustomInput`.

### `onChange?: (event: Event) => void`

Callback when the user has selected a file or multiple files.

### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt.

### `allowedFileTypes?: Array<string>`

The file types you want to restrict uploading to. eg: `['.jpeg', '.jpg']`.

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.
