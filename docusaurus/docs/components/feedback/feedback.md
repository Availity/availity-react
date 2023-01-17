---
title: <Feedback />
slug: feedback
---

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

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-feedback--default"> Storybook</a>

### Props

#### `appName?: string`

The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from.

#### `formProps?: FormProps`

Props to be spread to the underlying `FeedbackForm`. See the [FeedbackForm Props](/components/feedback/form/#props).

#### `children?: ReactNode`

The text to display on the submit button.

#### `outline?: boolean`

Indicates if the button should use the "outline" styles or not.

#### `color?: string`

The color of the button. **Default:** `"light"`.

#### `prompt?: string`

Text that prompts the user to provider feedback. **Default:** `"Tell us what you think about ${appName}."`.

#### `onFeedbackSent?: (feedback: FeedbackObject) => void`

Callback for when the feedback is submitted. It is called with the feedback object.

#### `modal?: boolean`

Whether to open the `FeedbackForm` in a modal

#### `zIndex?: number | string`

Allows for overriding the `z-index`value from react-strap `Modal`component.

#### `analytics?: AnalyticsType`

Override the analytics instance that is passed in. **Default** [avLogMessagesApi](https://availity.github.io/sdk-js/api/definitions/logs/)

#### `supportZIndex?: number | string`

Allows for overriding the `z-index` value from reactstrap Support `Modal` component.

#### `showSupport?: boolean`

Toggle whether or not to show the "Open a Support ticket" link in the FeedbackForm
