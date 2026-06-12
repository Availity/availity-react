---
title: Analytics
---

Track page events and user clicks.

[![Version](https://img.shields.io/npm/v/@availity/analytics.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics)

## Installation

### NPM

```bash
npm install @availity/analytics
```

### Yarn

```bash
yarn add @availity/analytics
```

## Usage

The `<Analytics />` component wraps your app to enable tracking of user interactions and page views. For a helpful overview of how to setup these tools, read our [Setting Up Logging](https://availity.github.io/availity-workflow/recipes/logging/) guide.

This package works alongside [@availity/analytics-core](https://www.npmjs.com/package/@availity/analytics-core). Starting with the Setting Up Logging guide will give you a better understanding of how they work together.

### Auto Tracking

Auto tracking logs user interactions based on `data-analytics-...` attributes on DOM elements, eliminating the need for custom event handlers.

```jsx
import React from 'react';
import Analytics from '@availity/analytics';
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvSplunkAnalytics } from '@availity/analytics-core';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const App = () => (
  <Analytics plugins={[splunkPlugin]}>
    <button
      type="button"
      data-analytics-action="click"
      data-analytics-my-value="123"
    >
      Button with analytics
    </button>
  </Analytics>
);
```

Read more about [auto tracking and its limitations](https://availity.github.io/sdk-js/resources/analytics/#auto-tracking-with-data-analytics-attributes).

### Manual Tracking

Use the `useAnalytics` hook to access the analytics instance and call `trackEvent()` directly.

```jsx
import React from 'react';
import Analytics, { useAnalytics } from '@availity/analytics';
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvSplunkAnalytics } from '@availity/analytics-core';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const MyComponent = () => {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.trackEvent({
      level: 'info',
      action: 'click',
      label: 'my-button',
    });
  };

  return <button onClick={handleClick}>Track me</button>;
};

const App = () => (
  <Analytics plugins={[splunkPlugin]}>
    <MyComponent />
  </Analytics>
);
```

## Props

### `plugins?: AnalyticsPlugin | AnalyticsPlugin[]`

A plugin or array of plugins to pass to the underlying AvAnalytics class instance. [Read more about analytics plugins](https://availity.github.io/sdk-js/resources/analytics/#plugins).

### `pageTracking?: boolean`

Enable or disable page tracking on initialization. **Default:** `true`.

### `autoTrack?: boolean`

Enable or disable auto tracking on initialization. **Default:** `true`.

### `recursive?: boolean`

Enable or disable recursive functionality on initialization. **Default:** `true`.

### `attributePrefix?: string`

Customize the prefix used for data analytics attributes. **Default:** `'data-analytics'`.

### `eventModifiers?: string[]`

Array of event modifiers for action type matching. **Default:** `['action']`.

## useAnalytics

Hook giving access to the `AvAnalytics` instance for manual event tracking.

```jsx
import { useAnalytics } from '@availity/analytics';

const Example = () => {
  const analytics = useAnalytics();

  return (
    <button onClick={() => analytics.trackEvent({ action: 'click', label: 'example' })}>
      Click Me
    </button>
  );
};
```
