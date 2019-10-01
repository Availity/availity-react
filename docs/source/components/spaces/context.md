---
title: SpacesContext
---

If you are using a class component, you can subscribe to the spaces by using this context.

## Example

```jsx
import React from 'react';
import { SpacesContext } from '@availity/spaces';
// ...
class SpacesComponent extends React.Component {
  render() {
    // id can be a space or a payer id
    const { space, images } = this.context;
    // Returns space and images for id
  }
}

SpacesComponent.contextType = SpacesContext;
```
