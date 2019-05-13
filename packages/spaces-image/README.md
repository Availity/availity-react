# @availity/spaces-image

> Easy to use component to display the spaces&#x27;s image given the space&#x27;s space or payer id

## Installation

```bash
npm install @availity/spaces-image --save
```

### Usage

```javascript
import React from 'react';
import SpacesLogo from '@availity/spaces-image';
// ... 
<SpacesLogo spaceId="73162546201441126239486200007187" clientId="my-client-id" alt="The word 'Payer' in green" />
<SpacesLogo payerId="PayerID" clientId="my-client-id" alt="The word 'Payer' in green" />
// ...
```

#### SpacesLogo (Default export)
Display the Space's logo

#### SpacesTile (Named export)
Display the Space's tile

#### SpacesBillboard (Named export)
Display the Space's billboard

##### Props

- **`clientId`**: String. **Required**

At least one of the following props must be provided:

- **`spaceId`**: String. Optional, required if `payerId` is not provided. The payer spaces ID for the payer for which you want a image.
- **`payerId`**: String. Optional, required if `spaceId` is not provided. The payer ID for the payer for which you want a image.
