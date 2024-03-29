# @availity/payer-logo

> THIS PACKAGE HAS BEEN DEPRECATED IN FAVOR OF `@availity/spaces`

[![Version](https://img.shields.io/npm/v/@availity/payer-logo.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/payer-logo)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/payer-logo.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/payer-logo)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/payer-logo?style=for-the-badge)](https://github.com/Availity/availity-react/blob/master/packages/payer-logo/package.json)

Easy to use component to display the payer&#x27;s logo given the payer&#x27;s ID

## Installation

```bash
npx install-peerdeps @availity/payer-logo --save
```

### Usage

```jsx
import React from 'react';
import PayerLogo from '@availity/payer-logo';

const Example = () => (
  <>
    <PayerLogo spaceId="73162546201441126239486200007187" clientId="my-client-id" alt="The word 'Payer' in green" />
    <PayerLogo payerId="PayerID" clientId="my-client-id" alt="The word 'Payer' in green" />
  </>
);
```

#### PayerLogo (Default export)

Easy to use component to display the payer&#x27;s logo given the payer&#x27;s ID

##### Props

- **`clientId`**: String. **Required**

At least one of the following props must be provided:

- **`spaceId`**: String. Optional, required if `payerId` is not provided. The payer spaces ID for the payer for which you want a logo.
- **`payerId`**: String. Optional, required if `spaceId` is not provided. The payer ID for the payer for which you want a logo.
