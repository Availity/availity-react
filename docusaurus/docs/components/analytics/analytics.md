---
title: <Analytics />
---

[![Version](https://img.shields.io/npm/v/@availity/analytics-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics-core)

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/components-analytics--default)

This `<Analytics />` component is part of Availity's toolset for tracking user interactions and page views in your application. For a helpful overview of how to setup these tools, read our [Setting Up Logging](https://availity.github.io/availity-workflow/recipes/logging/) guide. Logging in a React application at Availity involves imports from this React focused [@availity/analytics](https://www.npmjs.com/package/@availity/analytics) package and from [@availity/analytics-core](https://www.npmjs.com/package/@availity/analytics-core). Starting with the Setting Up Logging guide will give you a better understanding of how they work together.

For a detailed understanding of how analytics logging works, you will find it helpful to read [these docs on the AvAnalytics class](https://availity.github.io/sdk-js/resources/analytics), since `<Analytics />` implements an instance of `AvAnalytics`, and most of the props are forwarded directly to it.

For access to the underlying AvAnalytics instance in your React application, use the [useAnalytics hook](/availity-react/components/analytics/hook). This allows you to [manually track](https://availity.github.io/sdk-js/resources/analytics/#trackeventproperties-object) events, which does not have the same [limitations](https://availity.github.io/sdk-js/resources/analytics/#limitations) as [auto tracking](https://availity.github.io/sdk-js/resources/analytics/#auto-tracking-with-data-analytics-attributes) events.

## Auto Tracking vs Manual Uracking

### Auto Tracking

The [`AvAnalytics` class](https://availity.github.io/sdk-js/resources/analytics/) provides a convenient [auto tracking feature](https://availity.github.io/sdk-js/resources/analytics/) which allows user interactions to be automatically tracked based on special `data-analytics-...` attributes added directly to DOM elements or to React components that are able to forward these attributes to the underlying DOM elements.

Auto tracking is very convenient because it eliminates the need to create your own event handlers or setup listeners for the interactions you want to track, which would be required when using [manual tracking](https://availity.github.io/sdk-js/resources/analytics/#trackeventproperties-object). However, be aware that auto tracking does come with it's own set [limitations](https://availity.github.io/sdk-js/resources/analytics/#limitations).

The code sample below shows an example of using [auto tracking](https://availity.github.io/sdk-js/resources/analytics/#auto-tracking-with-data-analytics-attributes) with special `data-analytics-...` attributes added directly to DOM elements or to React components that are able to forward these attributes to the underlying DOM elements.

This is a complete example of setting up analytics in a React application using [data analytics attributes for auto tracking](https://availity.github.io/sdk-js/resources/analytics/#auto-tracking-with-data-analytics-attributes).

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

NOTE: In the code sample above, the Reactstrap `<Button>` component is able forwarded these data attributes to the native `<button>` element that the component renders. Not all React components can accept these data analytics attributes. Use the Elements panel of DevTools to confirm that these attributes are added to the appropriate DOM element.

Be sure to read more on auto tracking and the required data attributes [here on the docs for the AvAnalytics class](https://availity.github.io/sdk-js/resources/analytics/#auto-tracking-with-data-analytics-attributes).

### Manual Tracking

If the [limitations of auto tracking](https://availity.github.io/sdk-js/resources/analytics/#limitations) prevent you from logging the events you are interested in, you will need to use manual tracking by calling analytics.trackEvent() directly. For this, you will need access to the instance of AvAnalytics that has been initialize by the Analytics context provider. This instance is return by the [useAnalytics hook](/availity-react/components/analytics/hook).

Here is a complete example of using the [useAnalytics hook](/availity-react/components/analytics/hook) and the [`analytics.trackEvent()`](https://availity.github.io/sdk-js/resources/analytics/#trackeventproperties-object) method to manually track an event in React.

```jsx
import React from 'react';
import Analytics, { useAnalytics } from '@availity/analytics';

import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvSplunkAnalytics } from '@availity/analytics-core';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const MyDeeplyNestedComponent = () => {
  const analytics = useAnalytics();

  const handleMouseOver = () => {
    analytics.trackEvent({
      level: 'info',
      someValue: 'foo',
      otherValue: 'bar',
    });
  };

  return (
    <div onMouseOver={handleMouseOver}>
      Tracking mouseover events on this div
    </div>
  );
};

const App = () => (
  <Analytics plugins={[splunkPlugin]}>
    <MyDeeplyNestedComponent />
  </Analytics>
);

export default App;
```

<!--
### Required `data-analytics-...` attributes

Wrapping your app in the Analytics component without adding data attributes to DOM elements within your app will only allow you to track page load events. Tracking user interactions (i.e., 'click', 'focus' and 'blur' events) requires that you add the data attributes.

You can add many data attributes to a single element, including custom values, but the `data-analytics-action` with a value of 'click', 'focus' or 'blur' **_is required_**. Without it, no events will be tracked for that element. The 'focus' or 'blur' events can be tracked on `select`, `textarea` and `input` elements. You cannot track 'click' events on these elements and you cannot track 'focus' and 'blur' events for the same element at the same time. For all other DOM elements, only 'click' can be tracked.

For more details on these special attributes, see the documenation on the AvAnalytics class [regarding these special data attributes](https://availity.github.io/sdk-js/resources/analytics#special-attributes). -->

### Logging for Splunk and Insights

The examples above use `avLogMessagesApiV2` from [`@availity/api-axios`](https://www.npmjs.com/package/@availity/api-axios) and `AvSplunkAnalytics` from [`@availity/analytics-core`](https://www.npmjs.com/package/@availity/analytics-core). These are required for logging to Splunk or Insights. If you are creating a Payer Spaces app and want to use Insights reporting, read more about the the official [AvSplunkAnalytics](https://availity.github.io/sdk-js/resources/analytics/#official-avsplunkanalytics-plugin) and [other requirements for Payer Spaces apps to use Insights](https://availity.github.io/sdk-js/resources/analytics/#note-about-insights).

### Props

#### `plugins?: AnalyticsPlugin | AnalyticsPlugin[]`

A plugin or array of plugins to pass to the underlying AvAnalytics class instance. [Read more about analytics plugins](https://availity.github.io/sdk-js/resources/analytics/#plugins).

#### `pageTracking?: boolean`

Enable or disable page tracking on initialization. **Default:** `true`. [Read more about auto tracking](https://availity.github.io/sdk-js/resources/analytics/#pagetracking-boolean).

#### `autoTrack?: boolean`

Enable or disable auto tracking on initialization. **Default:** `true`. [Read more about page tracking](https://availity.github.io/sdk-js/resources/analytics/#autotrack-boolean)

#### `recursive?: boolean`

Enable or disable recursive functionality on initialization. **Default:** `true`. [Read more about recursive functionality](recursive functionality)

#### `attributePrefix?: string`

Customize the prefix used for data analytics attributes used for auto tracking. **Default:** `'data-analytics'`. [Read more about customizing the attribute prefix](https://availity.github.io/sdk-js/resources/analytics/#optionsattributeprefix-string)

#### `eventModifiers?: string | string[]`

Array of event modifiers enabling you to use other keywords for `action` instead of `click` for event type matching. **Default:** `['action']`. Note: This prop may not be working as expected. See [issue #1042](https://github.com/Availity/availity-react/issues/1042).
