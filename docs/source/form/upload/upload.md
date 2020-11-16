---
title: <Upload /> ( Default Export )
---

The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.

## Example

```jsx
import React from 'react';
import Upload from '@availity/form-upload';
import { Form } from '@availity/form';

<Form initialValues={{ myFile: undefined }}>
  <Upload name="myFile" clientId="a" bucketId="b" customerId="c" />;
</Form>;
```

## Props

### `name: string`

Identifies the field and matches the validation schema.

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

Callback to be executed when file is uploaded. The callback is provided the `Upload` instance from upload-core SDK. Use this callback to hook into the `upload.onSuccess` and `upload.onError` events and track which files have been uploaded and get references returned by the API if needed. See [example callback function below](###Callback-Function-Usage)

#### The `onFileUpload` callback takes precedence over the combination of `fileDeliveryMetadata`, `deliveryChannel`, and `deliverFileSubmit`. If all four properties are defined, only `onFileUpload` will be used.

### `onFileRemove?: (files: Array<File>, fileId: String) => void`

Callback called when file is removed. The callback is provided two arguments. 1. the updated files and 2. the id of the file that was removed

### `fileDeliveryMetadata?: object | (upload: UploadCore) => object`

The metadata properties that have been configured for the delivery channel you are trying to reach with `avFilesDeliveryApi`.

#### Use this prop together with `deliveryChannel` and `deliverFileOnSubmit` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.

If you have a use case where some of your metadata is dependent on information from the upload, you can define `fileDeliveryMetadata` as a function that accepts an upload variable. The upload will be passed to your function before the file delivery API call, and you can assign any dynamic props that you need to before returning the metadata object. See [example File Delivery Metadata Function Usage below](###File-Delivery-Metadata-Function-Usage)

### `deliveryChannel?: string`

The name of the delivery channel that is unique to where you will deliver files via the `avFileDeliveryApi`.

#### Use this prop together with `fileDeliveryMetadata` and `deliverFileOnSubmit` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.

### `deliverFileOnSubmit?: boolean`

This prop is used in tandem with `deliveryChannel` and `fileDeliveryMetadata` so that your files will only get delivered to `fileDeliveryApi` when the form is being submitted. **Default:** `false`

#### Use this prop together with `fileDeliveryMetadata` and `deliveryChannel` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.

### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.

### `max?: number`

The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited. When the max number has been reached, the add button will disappear.

### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. **Default:** `true`.

### `disabled?: boolean`

Disable the file input **Default:** `false`.

### `showFileDrop?: boolean`

Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click).

### `getDropRejectionMessage?: (errors: Array<FileError>, file: File) => String`

Override the default error message for files rejected when `showFileDrop` is `true`.

## Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

<Form initialValues={{ myFile: undefined }}>
  <Upload
    name="myFile"
    btnText="Upload a claim"
    clientId="a"
    bucketId="b"
    customerId="c"
    multiple={false}
    max={1}
  />
</Form>;
```

### Callback Function Usage

```jsx
<Form initialValues={{ myFile: undefined }}>
  <Upload
    name="myFile"
    btnText="Upload a claim"
    clientId="a"
    bucketId="b"
    customerId="c"
    onFileUpload={onUpload} // <-- add file callback function
    onFileRemove={onRemove} // <-- remove file callback function
    max={1}
  />
</Form>

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

### File Delivery Metadata Function Usage

```jsx
<Form initialValues={{ myFile: undefined }}>
  <Upload
    name="myFile"
    btnText="Upload a claim"
    clientId="a"
    bucketId="b"
    customerId="c"
    max={1}
    deliverFileOnSubmit={false} // can be true or false
    deliveryChannel="test"
    fileDeliveryMetadata={upload => {
      // execute any logic needed
      // return metadata object with your needed properties
      return {
        payerId: 'testPayer',
        dynamicNameBasedOnUpload: upload.id,
        filetype: upload.file.type,
      };
    }}
  />
</Form>
```
