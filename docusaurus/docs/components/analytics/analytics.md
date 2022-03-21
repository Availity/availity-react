---
title: <Analytics />
---

This Analytics component is part of Availity's toolset for tracking 'click', 'blur', 'focus' and page load events in your application. For a helpful overview of how to setup these tools, read our [Setting Up Logging](https://availity.github.io/availity-workflow/recipes/logging/) guide. Logging in a React application at Availity usually involves imports from this React focused [@availity/analytics](https://www.npmjs.com/package/@availity/analytics) package and from [@availity/analytics-core](https://www.npmjs.com/package/@availity/analytics-core). Starting with the Setting Up Logging guide will give you a better understanding of how they work together.

You may also find it helpful read [these docs on the AvAnalytics class](https://availity.github.io/sdk-js/resources/analytics), since the Analytics component implements an instance of AvAnalytics, and most of the props are forwarded directly to it.

### Example

```jsx
import React from 'react';
import Analytics from '@availity/analytics';
import { Button } from 'reactstrap';
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvSplunkAnalytics } from '@availity/analytics-core';

const mySpecialValue = '123';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const App = () => (
  <Analytics plugins={[splunkPlugin]}>
    <div>
      <Button
        type="button"
        data-analytics-action="click"
        data-analytics-my-special-value={mySpecialValue}
      >
        Button with analytics
      </Button>
    </div>
  </Analytics>
);

export default App;
```

Clicking the button in this example will make an API call with the following payload:

```
level: info
entries.action: click
entries.mySpecialValue: 123
entries.event: click
entries.url: <url of the page where the user performed the action>
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/components-analytics--default)

### Required `data-analytics-...` attributes

Wrapping your app in the Analytics component without adding data attributes to DOM elements within your app will only allow you to track page load events. Tracking user interactions (i.e., 'click', 'focus' and 'blur' events) requires that you add the data attributes.

You can add many data attributes to a single element, including custom values, but the `data-analytics-action` with a value of 'click', 'focus' or 'blur' **_is required_**. Without it, no events will be tracked for that element. The 'focus' or 'blur' events can be tracked on `select`, `textarea` and `input` elements. You cannot track 'click' events on these elements and you cannot track 'focus' and 'blur' events for the same element at the same time. For all other DOM elements, only 'click' can be tracked.

For more details on these special attributes, see the documenation on the AvAnalytics class [regarding these special data attributes](https://availity.github.io/sdk-js/resources/analytics#special-attributes).

### Props

#### `plugins?: AnalyticsPlugin[]`

An array of plugins to pass to the underlying AvAnalytics class instance. Methods on these plugins will be called to track user actions and page loads. Refer to [the AvAnalytics docs](https://availity.github.io/sdk-js/resources/analytics) for details on plugins and their methods, or for [official Availity plugins](https://availity.github.io/sdk-js/resources/analytics/#defined-plugins) for working with Splunk and Insights.

#### `pageTracking?: boolean`

Whether or not the initial page tracking is enabled. **Default:** `true`.

#### `autoTrack?: boolean`

Whether or not initial event tracking is enabled. **Default:** `true`.

#### `recursive?: boolean`

When an event is created, if `true`, will traverse up the DOM tree from the given element and take `data-analytics` attributes off each component until it reaches the root. **Default:** `true`

#### `attributePrefix?: string`

Prefix to apply on event attributes you want to strip off components on click. **Default:** `data-analytics`

#### `eventModifiers?: string | string[]`

Array of event modifiers enabling you to use other keywords for `action` instead of `click` for event type matching. **Default:** `['action']`
