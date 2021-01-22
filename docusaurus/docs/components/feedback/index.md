---
title: Getting Started
---

Availity feedback with smiley faces react component.

[![Version](https://img.shields.io/npm/v/@availity/feedback.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/feedback)

### Installation

```bash
npx install-peerdeps @availity/feedback --save
```

### Example

```jsx
import React from 'react';
import Feedback from '@availity/feedback';

const Example = () => (
  <Feedback
    appName="Payer Space"
    prompt="Please provide some feedback"
    color="primary"
  >
    Provide Feedback
  </Feedback>
);
```
