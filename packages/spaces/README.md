# @availity/spaces

> Easy to use spaces components

## Installation

```bash
npm install @availity/spaces --save
```

## Spaces (Default export)
This is the provider component needed for `@availity/spaces` components to work. All `@availity/spaces` components must be children of a Spaces provider.

### Props

- **`clientId`**: String. **Required** clientId to use in slotmachine request
- **`query`**: String. Optional. Override the default slotmachine query
- **`variables`**: Object. Override the default variables used in the slotmachine query


### Images

#### Usage
```javascript
import React from 'react';
import Spaces, { SpacesLogo, SpacesBillboard, SpacesTile } from '@availity/spaces';
// ... 
<Spaces clientId="my-client-id">
  <SpacesLogo spaceId="73162546201441126239486200007187" />
  <SpacesBillboard payerId="PayerID" />
  <SpacesTile payerId="PayerID" />
</Spaces>
// ...
```

#### SpacesLogo (Named export)
Display the Space's logo

#### SpacesTile (Named export)
Display the Space's tile

#### SpacesBillboard (Named export)
Display the Space's billboard

##### Props

At least one of the following props must be provided:

- **`spaceId`**: String. Optional, required if `payerId` is not provided. The payer spaces ID for the payer for which you want a image.
- **`payerId`**: String. Optional, required if `spaceId` is not provided. The payer ID for the payer for which you want a image.

### useSpaces

This is a custom hook for grabbing any Spaces data you may need from the `Spaces` provider.

#### Example usage

```javascript
import React from 'react';
import { useSpaces } from '@availity/spaces';
// ...
const SpacesComponent = () => {
    const [space, images] = useSpaces(spaceId, payerId);
    // Returns space and images for spaceId, if available. Otherwise returns space and images for payerId
};
```

### SpacesContext

If you are using a class component, you can subscribe to the spaces by using this context.


#### Example usage

```javascript
import React from 'react';
import { SpacesContext } from '@availity/spaces';
// ...
class SpacesComponent extends React.Component {
  render() { 
    const [space, images] = useSpaces(spaceId, payerId);
    // Returns space and images for spaceId, if available. Otherwise returns space and images for payerId
  }
}

SpacesComponent.contextType = SpacesContext;
```
