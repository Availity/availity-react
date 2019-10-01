---
title: <Upload /> ( Default Export )
---

The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.

## Example

```jsx
import React from 'react';
import Upload from '@availity/upload';

<Upload clientId="a" bucketId="b" customerId="c" />;
```

## Props

### `btnText?: ReactNode`

`+ Add File` for initial file or `+ Add Another File Attachment` if an attachment already have been selected. | The text that appears on the button.

### `bucketId: string`

The ID of the bucket you want to upload to.

### `customerId: string`

The customer ID for the organization the user is uploading on behalf of.

### `clientId: string`

The ID obtained from APIConnect. Must be subscribed to the resumeable uploads API.

### `allowedFileNameCharacters?: string`

Restrict the file name characters to a regex set.

### `allowedFileTypes?: Array<string>`

Restrict the file types allowed to be uploaded to. eg: `['.jpeg', '.jpg']`.

### `onFileUpload?: (upload: UploadCore) => void`

Callback called when file is uploaded. The callback will be provided the `Upload` instance from upload-core SDK. Use this callback to track which files have been uploaded (to get references returned by the API).

### `onFileRemove?: (files: Array<File>) => void`

Callback called when file is removed. The callback will be provided the `Upload` instance from upload-core SDK.

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.

### `max?: number`

The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited. When the max number has been reached, the add button will disappear.

### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. **Default:** `true`.

### `showFileDropdown?: boolean`

Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click).

## Example

```jsx
import React from 'react';
import Upload from '@availity/upload';

<Upload
  btnText="Upload a claim"
  clientId="a"
  bucketId="b"
  customerId="c"
  multiple={false}
  max={1}
/>;
```

### Callback Function Usage

```jsx
<Upload
  btnText="Upload a claim"
  clientId="a"
  bucketId="b"
  customerId="c"
  onFileUpload={onUpload} // <-- add file callback function
  onFileRemove={onRemove} // <-- remove file callback function
  max={1}
/>

// onUpload callback definition
onUpload(upload) {
    if (upload) {
      upload.onSuccess.push(async () => {
        // success action
      });
      upload.onError.push(() => {
        // error action
      });
    }
  }
// ...

// onRemove callback definition
onRemove(file) {
  // remove action
}
```
