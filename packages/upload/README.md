# @availity/upload

> Availity upload component for uploading files

## Installation

```bash
npm install @availity/upload --save
```

### Usage

```javascript
import React from 'react';
import Upload from '@availity/upload';
// ... 
<Upload
  clientId="a"
  bucketId="b"
  customerId="c"
/>
// ...
```

#### Upload (Default export)
The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.

##### Props

- **`btnText`**: Node. Optional. The text which appears on the button. Default: `+ Add File` for initial file or `+ Add Another File Attachment` if an attachment already have been selected.
- **`bucketId`**: String. Required. The ID of the bucket you want to upload to.
- **`customerId`**: String. Required. The customer ID for the organization the user is uploading on behave of.
- **`clientId`**: String. Required. The ID obtain from APIConnect. Must be subscribed to the resumeable uploads API.
- **`allowedFileTypes`**: Array of strings. Optional. The file types you want to restrict uploading to. E.g. `['.jpeg', '.jpg']`.
- **`onFileUpload`**: Function. Optional. Callback called when file is uploaded. The callback will be provided the `Upload` instance form upload-core SDK. Use this callback to track files which have been uploaded (to get references returned by the API).
- **`maxSize`**: Number. Optional. The maximum file size (in bytes) for a file to be uploaded.
- **`max`**: Number. Optional. The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited. When the max number has been reached the add button will disappear. Default: unlimited.
- **`multiple`**: Boolean. Optional. Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. Default: `true`

##### Upload Usage

```javascript
import React from 'react';
import Upload from '@availity/upload';
// ... 
<Upload
  btnText="Upload a claim"
  clientId="a"
  bucketId="b"
  customerId="c"
  multiple={false}
  max={1}
/>
// ...
```

#### UploadProgressBar
The raw progress bar to be used when making your own.

##### Props

- **`upload`**: Instance of Upload from upload-core. Required. The upload instance returned by creating a `new Upload` via upload-core.
- **`onProgress`**: Function. Optional. Callback function to hook into the `onProgress` within the Upload instance provided in the `upload` prop.
- **`onSuccess`**: Function. Optional. Callback function to hook into the `onSuccess` within the Upload instance provided in the `upload` prop.
- **`onError`**: Function. Optional. Callback function to hook into the `onError` within the Upload instance provided in the `upload` prop.
- **`animated`**: Boolean. Optional. When `true` the progress bar will have animated stripes while uploading is in progress.
- **`className`**: String. Optional. Additional classNames to add to the progress bar.

##### UploadProgressBar Usage

```javascript
import React from 'react';
import { UploadProgressBar } from '@availity/upload';
// ... 
<UploadProgressBar
  upload={uploadInstance}
  animated
/>
// ...
```

#### FilePickerBtn
The raw file picker button which masks the file input with a button.

##### Props

- **`onClick`**: Function. Optional. Callback when the button is clicked.
- **`onChange`**: Function. Optional. Callback when the user has selected a file or multiple files.
- **`multiple`**: Boolean. Optional. Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt.
- **`allowedFileTypes`**: Array of strings. Optional. The file types you want to restrict uploading to. E.g. `['.jpeg', '.jpg']`.
- **`maxSize`**: Number. Optional. The maximum file size (in bytes) for a file to be uploaded.

##### FilePickerBtn Usage

```javascript
import React from 'react';
import { FilePickerBtn } from '@availity/upload';

handleFileSelection = event => {
  const { files } = event.target;
  // do something with the files.
}
// ... 
<FilePickerBtn
  onChange={this.handleFileSelection}
/>
// ...
```

#### FilePicker
The raw file picker which automatically resets the value of the input, allowing the same file to be selected multiple consecutive files.

##### Props

- **`tag`**: String or Function. Optional. The raw underlying component/element which should be rendered. Default reactstrap's `CustomInput`.
- **`onClick`**: Function. Optional. Callback when the button is clicked.
- **`onChange`**: Function. Optional. Callback when the user has selected a file or multiple files.
- **`multiple`**: Boolean. Optional. Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt.
- **`allowedFileTypes`**: Array of strings. Optional. The file types you want to restrict uploading to. E.g. `['.jpeg', '.jpg']`.
- **`maxSize`**: Number. Optional. The maximum file size (in bytes) for a file to be uploaded.

##### FilePicker Usage

```javascript
import React from 'react';
import { FilePicker } from '@availity/upload';
import { CustomInput } from 'reactstrap';

handleFileSelection = event => {
  const { files } = event.target;
  // do something with the files.
}
// ... 
<FilePicker
  tag={CustomInput}
  onChange={this.handleFileSelection}
/>
// ...
```