---
title: <Upload />
---

The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.

### Basic Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

const Example = () => (
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
  </Form>
);
```

### Callback Function Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

const Example = () => {
  const onUpload = (upload) => {
    if (upload) {
      upload.onSuccess.push(async () => {
        // success action
      });
      upload.onError.push(() => {
        // error action
      });
    }
  };

  const onRemove = (file) => {
    // remove action
  };

  return (
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
  );
};
```

### File Delivery Metadata Function Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

const Example = () => (
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
      fileDeliveryMetadata={(upload) => {
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
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-upload--default"> Storybook</a>

### Props

#### `name: string`

Identifies the field and matches the validation schema.

#### `btnColor?: string`

The color of the button. Refer to the Reactstrap documentation to determine which colors are available. **Default:** `light`.

#### `btnText?: ReactNode`

`+ Add File` for initial file or `+ Add Another File Attachment` if an attachment already have been selected. | The text that appears on the button.

#### `bucketId: string`

The ID of the bucket you want to upload to.

#### `customerId: string`

The customer ID for the organization the user is uploading on behalf of.

#### `clientId: string`

The ID obtained from APIConnect. Must be subscribed to the resumeable uploads API.

#### `allowedFileNameCharacters?: string`

Restrict the file name characters to a regex set.

#### `allowedFileTypes?: string[]`

Restrict the file types allowed to be uploaded to. eg: `['.jpeg', '.jpg']`.

#### `onFileUpload?: (upload: UploadCore) => void`

Callback to be executed when file is uploaded. The callback is provided the `Upload` instance from upload-core SDK. Use this callback to hook into the `upload.onSuccess` and `upload.onError` events and track which files have been uploaded and get references returned by the API if needed. See [example callback function above](###Callback-Function-Example)

> The `onFileUpload` callback takes precedence over the combination of `fileDeliveryMetadata`, `deliveryChannel`, and `deliverFileSubmit`. If all four properties are defined, only `onFileUpload` will be used.

#### `onFileRemove?: (files: File[], fileId: String) => void`

Callback called when file is removed. The callback is provided two arguments. 1. the updated files and 2. the id of the file that was removed

#### `fileDeliveryMetadata?: object | (upload: UploadCore) => object`

The metadata properties that have been configured for the delivery channel you are trying to reach with `avFilesDeliveryApi`.

:::info
Use this prop together with `deliveryChannel` and `deliverFileOnSubmit` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.
:::

If you have a use case where some of your metadata is dependent on information from the upload, you can define `fileDeliveryMetadata` as a function that accepts an upload variable. The upload will be passed to your function before the file delivery API call, and you can assign any dynamic props that you need to before returning the metadata object. See [example File Delivery Metadata Function Example above](###File-Delivery-Metadata-Function-Example)

#### `deliveryChannel?: string`

The name of the delivery channel that is unique to where you will deliver files via the `avFileDeliveryApi`.

:::info
Use this prop together with `fileDeliveryMetadata` and `deliverFileOnSubmit` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.
:::

#### `deliverFileOnSubmit?: boolean`

This prop is used in tandem with `deliveryChannel` and `fileDeliveryMetadata` so that your files will only get delivered to `fileDeliveryApi` when the form is being submitted. When false, the files are delivered as the user adds them. **Default:** `false`

:::info
Use this prop together with `fileDeliveryMetadata` and `deliveryChannel` to have uploads automatically sent to the file delivery API with the proper configuration, without the need to define a custom `onFileUpload` function.
:::

#### `onDeliverySuccess?: (responses: object[]) => void`

Callback to be executed when the delivery API call(s) have completed. It is called with an array of API responses (array of one if a single call was made). Note: a delivery can be REJECTED/FAILED/etc when the success callback is called - make sure to check the `deliveryStatus` for accurate handling.

:::info
Use this prop together with `fileDeliveryMetadata` and `deliveryChannel` to define custom actions once the file delivery API call has completed.
:::

#### `onDeliveryError?: (err: object) => void`

Callback to be executed when the delivery API call(s) have failed. It is called with the error that was thrown.

:::info
Use this prop together with `fileDeliveryMetadata` and `deliveryChannel` to define error actions if the file delivery API call threw an error.
:::

#### `maxSize?: number`

The maximum file size (in bytes) for a file to be uploaded.

#### `totalMaxSize?: number`

The total maximum combined file size (in bytes) for all the files to be uploaded.

#### `max?: number`

The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited. When the max number has been reached, the add button will disappear.

#### `multiple?: boolean`

Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. **Default:** `true`.

#### `disabled?: boolean`

Disable the file input **Default:** `false`.

#### `showFileDrop?: boolean`

Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click).

#### `getDropRejectionMessage?: (errors: FileError[], file: File) => String`

Override the default error message for files rejected when `showFileDrop` is `true`.

#### `fallback?: node`

A custom `fallback` element to render while `Dropzone` is being imported from `'react-dropzone`. Since `Dropzone` is only used when `showFileDrop` is `true`, it is imported using [lazy loading and suspense](https://reactjs.org/docs/code-splitting.html#reactlazy) to cut down on the bundle size the client needs to initially download.

Defaults to

```jsx
<div>Loading...</div>
```
