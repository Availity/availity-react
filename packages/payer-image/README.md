# @availity/payer-image

> Easy to use component to display the payer&#x27;s image given the payer&#x27;s ID

## Installation

```bash
npm install @availity/payer-image --save
```

### Usage

```javascript
import React from 'react';
import PayerLogo from '@availity/payer-image';
// ... 
<PayerLogo spaceId="73162546201441126239486200007187" clientId="my-client-id" alt="The word 'Payer' in green" />
<PayerLogo payerId="PayerID" clientId="my-client-id" alt="The word 'Payer' in green" />
// ...
```

#### PayerLogo (Default export)
Display the Payer's logo

#### PayerTile (Named export)
Display the Payer's tile

#### PayerBillboard (Named export)
Display the Payer's billboard

##### Props

- **`clientId`**: String. **Required**

At least one of the following props must be provided:

- **`spaceId`**: String. Optional, required if `payerId` is not provided. The payer spaces ID for the payer for which you want a image.
- **`payerId`**: String. Optional, required if `spaceId` is not provided. The payer ID for the payer for which you want a image.
