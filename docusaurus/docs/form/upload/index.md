---
title: Getting Started
---

Availity component for uploading files, compatible with @availity/form

### Installation

npm

```bash
npm install @availity/form-upload --save
```

Yarn

```bash
yarn add @availity/form-upload
```

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Upload from '@availity/form-upload';

const Example = () => (
  <Form initialValues={{ myFile: undefined }}>
    <Upload name="myFile" clientId="a" bucketId="b" customerId="c" />
  </Form>
);
```
