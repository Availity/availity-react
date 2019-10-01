---
title: <FilePickerBtn />
summary: The raw file picker button that masks the file input with a button.
---

## Example

```jsx
import React from 'react';
import { FilePickerBtn } from '@availity/upload';

handleFileSelection = event => {
  const { files } = event.target;
  // do something with the files.
};

<FilePickerBtn onChange={this.handleFileSelection} />;
```

## Props

### `onClick?: (event: Event) => void`

Callback when the button is clicked.

### `onChange?: (event: Event) => void`

Callback when the user has selected a file or multiple files.

### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt.

### `allowedFileTypes?: Array<string>`

The file types you want to restrict uploading to. eg: `['.jpeg', '.jpg']`.

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.
