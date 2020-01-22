---
title: Upload
summary: Availity component for uploading files, compatible with @availity/form
---

## Installation

```bash
npm install @availity/form-upload --save
```

## Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

<Form initialValues={{ myFile: undefined }}>
  <Upload name="myFile" clientId="a" bucketId="b" customerId="c" />
</Form>
```
