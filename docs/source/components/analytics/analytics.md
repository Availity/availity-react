---
title: <Analytics /> ( Default Export )
summary: Component allowing page and click events to be tracked.
---

## Example

```jsx
import React from 'react';
import { Button } from 'reactstrap';
import Analytics from '@availity/Analytics';

const plugin = {
    trackEvent: e => {
        alert(JSON.stringify(e))
    }
}

<Analytics
    plugins={[plugin]}
    recurisve
    attributePrefix="data-av-analytics"
    eventModifiers="action"
>
  <Button type="button" data-av-analytics-action="click" id="button">Click Me</Button>
</Analytics>
```

## Props

### `plugins?: AnalyticsPlugin[]`

Array of plugins to call when an event is tracked. See [@availity/analytics-core](/sdk-js/features/analytics/) for list of prebuilt plugins.

### `pageTracking?: boolean`

Whether or not the initial page tracking is enabled. **Default:** `true`.

### `autoTrack?: boolean`

Whether or not initial event tracking is enabled. **Default:** `true`.

### `recursive?: boolean`

When an event is created, if `true`, will traverse up the DOM tree from the given element and take `data-analytics` attributes off each component until it reaches the root. **Default:** `true`

### `attributePrefix?: string`

Prefix to apply on event attributes you want to stripe off components on click. **Default:** `data-analytics`

### `eventModifiers?: string | string[]`

Array of event modifiers enabling you to use other keywords for `action` instead of `click` for event type matching. **Default:** `['action']`
