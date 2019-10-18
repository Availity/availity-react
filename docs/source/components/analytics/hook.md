---
title: useAnalytics
---

Hook giving you access to the instance of `@availity/analytics-core` for manually tracking events, and changing different variables.

## Example

```jsx
import React from 'react';
import { Button } from 'reactstrap';
import { useAnalytics } from '@availity/analytics';
const Component = () => {
  const { trackEvent } = useAnalytics();
  return (
    <Button onClick={() => trackEvent({ url: '/test', data: 'some-data' })}>
      Click Me
    </Button>
  );
};
```
