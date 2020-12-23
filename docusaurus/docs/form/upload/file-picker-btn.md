---
title: <FilePickerBtn />
---

The raw file picker button that masks the file input with a button.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { FilePickerBtn } from '@availity/form-upload';

handleFileSelection = event => {
  const { files } = event.target;
  // do something with the files.
};

<Form initialValues={{ myFile: undefined }}>
  <FilePickerBtn name="myFile" onChange={this.handleFileSelection} />
</Form>;
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-upload--picker-button"> Storybook</a>

### Props

#### `name: string`

Identifies the field and matches the validation schema.

#### `onClick?: (event: Event) => void`

Callback when the button is clicked.

#### `onChange?: (event: Event) => void`

Callback when the user has selected a file or multiple files.

#### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt.

#### `disabled?: boolean`

Disable the file input **Default:** `false`.

#### `allowedFileTypes?: Array<string>`

The file types you want to restrict uploading to. eg: `['.jpeg', '.jpg']`.

#### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.
