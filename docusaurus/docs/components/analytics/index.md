---
title: Getting Started
---

Track page events and user clicks.

[![Version](https://img.shields.io/npm/v/@availity/analytics.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics)

### Installation

```bash
npm install @availity/analytics --save
```

### Example

```jsx
import React from 'react';
import { Button } from 'reactstrap';
import Analytics from '@availity/Analytics';

const plugin = {
    trackEvent: e => {
        alert(JSON.stringify(e))
    }
}

<Analytics  plugins={[plugin]} attributePrefix="data-av-analytics">
<Button type="button" data-av-analytics-action="click" id="button">Click Me</Button>
</Analytics>
```
