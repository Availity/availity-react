# @availity/spaces

> Easy to use spaces components

## Installation

```bash
npm install @availity/spaces reactstrap --save
```

## Spaces (Default export)
This is the provider component needed for `@availity/spaces` components to work. All `@availity/spaces` components must be children of a Spaces provider.

### Props

- **`clientId`**: String. **Required** clientId to use in slotmachine request
- **`query`**: String. Optional. Override the default slotmachine query
- **`variables`**: Object. Override the default variables used in the slotmachine query
- **`spaces`**: Object array. Array of spaces to be passed into the Spaces provider. Useful for if you already have the spaces in your app and don't want the spaces provider to have to fetch them again.
- **`spaceIds`**: String array. Array of spaceIds the Spaces provider should fetch the spaces for. Any `spaceIds` already included in `spaces` will not be fetched again.
- **`payerIds`**: String array. Array of payerIds the Spaces provider should fetch the spaces for. Any `payerIds` already included in `spaces` will not be fetched again.

### Images

#### Usage
```javascript
import React from 'react';
import Spaces, { SpacesLogo, SpacesBillboard, SpacesTile } from '@availity/spaces';
// ... 
<Spaces
  spaceIds={['73162546201441126239486200007187']}
  payerIds={['PayerID']}
  clientId="my-client-id"
>
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
- **`skeletonProps`**: object. Optional, dimensions passed to loader to show while the image is loading.
- **`fallback`**: String. Optional. If the url for the spaces image is not valid or not found, this fallback image url will be rendered.

### SpacesDisclaimer (Named Export)
Display the disclaimer for a given space id. 

#### Props
- **`spaceId`**: String. **Required**. The id of the space to render the disclaimer for
- **`markdown`**: Boolean. Optional. Default: false. Whether to render the disclaimer as markdown
- **`styled`**: Boolean. Optional. See [Disclaimer](../typography)

#### Usage
```javascript
import React from 'react';
import Spaces, { SpacesDisclaimer } from '@availity/spaces';
// ... 
<Spaces
  spaceIds={['73162546201441126239486200007187']}
  clientId="my-client-id"
>
  <SpacesDisclaimer spaceId="73162546201441126239486200007187" markdown styled />
</Spaces>
// ...
```

### SpacesGhostText (Named Export)
Display the ghost text for a given space. Renders `null` if the ghost text should not display.

#### Props
- **`spaceId`**: String. **Required**. The id of the space to render the ghost text for

#### Usage
```javascript
import React from 'react';
import Spaces, { SpacesGhostText } from '@availity/spaces';
// ... 
<Spaces
  spaceIds={['73162546201441126239486200007187']}
  clientId="my-client-id"
>
  <SpacesGhostText spaceId="73162546201441126239486200007187" />
</Spaces>
// ...
```

### useSpace

This is a custom hook for grabbing any Spaces data you may need from the `Spaces` provider.

#### Example usage

```javascript
import React from 'react';
import { useSpace } from '@availity/spaces';
// ...
const SpacesComponent = () => {
    // id can be a space or a payer id
    const {space, isGhost, loading} = useSpace(id);
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
    // id can be a space or a payer id
    const {space, images} = this.context;
    // Returns space and images for id
  }
}

SpacesComponent.contextType = SpacesContext;
```
