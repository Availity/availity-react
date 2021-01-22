---
title: <UploadProgressBar />
---

The raw progress bar to be used when making your own.

### Example

```jsx
import React from 'react';
import { UploadProgressBar } from '@availity/upload';

const Example = () => <UploadProgressBar upload={uploadInstance} animated />;
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-upload--progress-bar"> Storybook</a>

### Props

#### `upload?: UploadCore`

The upload instance returned by creating a `new Upload` via [upload-core](https://github.com/Availity/sdk-js/tree/master/packages/upload-core).

#### `onProgress?: (upload: UploadCore) => void`

Callback function to hook into the `onProgress` within the Upload instance provided in the `upload` prop.

#### `onSuccess?: (upload: UploadCore) => void`

Callback function to hook into the `onSuccess` within the Upload instance provided in the `upload` prop.

#### `onError?: (upload: UploadCore) => void`

Callback function to hook into the `onError` within the Upload instance provided in the `upload` prop.

#### `complete?: boolean`

Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar.

#### `striped?: boolean`

Triggers the "striped" style in the progress bar.

#### `animated?: boolean`

When `true` the progress bar has animated stripes while uploading is in progress.

#### `color?: string`

Color of the progress bar. **Default:** `success`
