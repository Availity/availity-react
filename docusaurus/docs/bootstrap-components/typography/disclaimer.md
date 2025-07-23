---
title: Disclaimer
---

### Example

```jsx
import React from 'react';
import { Disclaimer } from '@availity/typography';

const Example = () => (
  <Disclaimer styled>
    I have fully read this agreement and understand that I am entering into a
    legally binding agreement and that my organization is bound by the terms and
    conditions contained therein. I attest and certify that I am the Primary
    Controlling Authority for the organization named herein and that I possess
    the necessary legal authority to bind this organization. I further attest
    and certify my organization&apos;s designation as a Covered Entity under
    HIPAA, as more fully described in 45 CFR § 160.103.
  </Disclaimer>
);
```

### Props

#### `styled?: boolean`

Determine if a vertical bar is displayed to the left of the disclaimer. Default is `true`
