---
title: Payer Logo
---

:::warning Deprecated
This package is deprecated and will be removed in a future release.
:::

Component to display a payer's logo given the payer's ID or space ID.

[![Version](https://img.shields.io/npm/v/@availity/payer-logo.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/payer-logo)

## Installation

```bash
npm install @availity/payer-logo
```

## Usage

```jsx
import React from 'react';
import PayerLogo from '@availity/payer-logo';

const Example = () => (
  <>
    <PayerLogo spaceId="73162546201441126239486200007187" clientId="my-client-id" alt="Payer logo" />
    <PayerLogo payerId="PayerID" clientId="my-client-id" alt="Payer logo" />
  </>
);
```

## Props

### `clientId: string`

**Required.** The client ID for the application requesting the logo.

### `spaceId: string`

The payer spaces ID. Required if `payerId` is not provided.

### `payerId: string`

The payer ID. Required if `spaceId` is not provided.

### HTML `<img>` Attributes

All standard HTML `<img>` attributes (such as `alt`, `className`, `style`, etc.) are spread onto the underlying `<img>` element.
