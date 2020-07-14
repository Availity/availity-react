# @availity/upload

> Availity component for uploading files

[![Version](https://img.shields.io/npm/v/@availity/upload.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/upload)

## Installation

```bash
npx install-peerdeps @availity/upload --save
```

## Upload (Default export)

The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.

### Example

```jsx
import React from 'react';
import Upload from '@availity/upload';

<Upload clientId="a" bucketId="b" customerId="c" />;
```

## Props

### `btnText?: ReactNode`

`+ Add File` for initial file or `+ Add Another File Attachment` if an attachment already have been selected. | The text that appears on the button.

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

Callback called when file is uploaded. The callback is provided the `Upload` instance from upload-core SDK. Use this callback to track which files have been uploaded (to get references returned by the API).

### `onFileRemove?: (files: Array<File>, fileId: String) => void`

Callback called when file is removed. The callback is provided two arguments. 1. the updated files and 2. the id of the file that was removed

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.

### `max?: number`

The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited. When the max number has been reached, the add button will disappear.

### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. **Default:** `true`.

<<<<<<< HEAD
### `showFileDropdown?: boolean`

Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click).

=======
### `disabled?: boolean`

Disable the file input **Default:** `false`.

### `showFileDrop?: boolean`

Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click).

### `getDropRejectionMessage?: (errors: Array<FileError>, file: File) => String`

Override the default error message for files rejected when `showFileDrop` is `true`.

>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
### Example

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

#### Callback Function Usage

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


## FilePickerBtn (Named Export)

The raw file picker button that masks the file input with a button.

### Example

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

<<<<<<< HEAD
=======
### `disabled?: boolean`

Disable the file input **Default:** `false`.

>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
### `allowedFileTypes?: Array<string>`

The file types you want to restrict uploading to. eg: `['.jpeg', '.jpg']`.

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.


## FilePicker (Named Export)

The raw file picker which automatically resets the value of the input, allowing the same file to be selected multiple consecutive files.

### Example

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


## UploadProgressBar

The raw progress bar to be used when making your own.

### Example

```jsx
import React from 'react';
import { UploadProgressBar } from '@availity/upload';

<UploadProgressBar upload={uploadInstance} animated />;
```

## Props

### `upload?: UploadCore`
The upload instance returned by creating a `new Upload` via [upload-core](https://github.com/Availity/sdk-js/tree/master/packages/upload-core).

### `onProgress?: (upload: UploadCore) => void`
Callback function to hook into the `onProgress` within the Upload instance provided in the `upload` prop.

### `onSuccess?: (upload: UploadCore) => void`
Callback function to hook into the `onSuccess` within the Upload instance provided in the `upload` prop.

### `onError?: (upload: UploadCore) => void`
Callback function to hook into the `onError` within the Upload instance provided in the `upload` prop.

### `complete?: boolean`
Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar.

### `striped?: boolean`
Triggers the "striped" style in the progress bar.

### `animated?: boolean`
When `true` the progress bar has animated stripes while uploading is in progress.

### `color?: string`
Color of the progress bar. **Default:** `success`
