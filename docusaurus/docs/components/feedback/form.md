---
title: <FeedbackForm />
---

This is the underlying form, which is exposed in case you need to gather feedback inline.

### Example

```jsx
import React from 'react';
import { FeedbackForm } from '@availity/feedback';

const Example = () => <FeedbackForm name="Payer Space" />;
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-feedback--with-form"> Storybook</a>

### Props

#### `name?: string`

The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from.

#### `onFeedbackSent?: (feedback: FeedbackObject) => void`

Callback for when the feedback is submitted. It is called with the feedback object.

#### `faceOptions?: object[]`

Array of Objects containing **`icon`** (String), **`description`** (String), and **`placeholder`** (String) properties. Allows you to override the smiley face options which appear. Default: Smiley Face, Meh Face, and Frowny Face.

#### `aboutOptions?: object[]`

Array of Objects containing **`value`** (String,Number) and **`label`** (String) properties. Allows a dropdown displaying the options provided to let the user indicate what the feedback is about.

#### `aboutPlaceholder?: node`

Placeholder text for the dropdown created via the `aboutOptions` prop. **Default:** `"This is about..."`.

#### `onClose?: () => void`

When provided, a "Close" button is rendered and `onClose` is excuted when it's clicked.

#### `prompt?: string`

Text that prompts the user to provider feedback. **Default:** `"Tell us what you think about ${appName}."`.

#### `additionalComments?: boolean`

If `true`, shows an optional comments field below.

#### `staticFields?: object`

Static (non-user-entered) key/value pairs to be sent in feedback submission.

#### `modalHeaderProps?: ModalHeaderProps`

Props to be spread onto the `<ModalHeader />` rendered inside of the `<FeedbackForm />`. See [ModalHeader](https://github.com/reactstrap/reactstrap/blob/master/src/ModalHeader.js)

#### `...rest`

View full set of [Form Props](https://availity.github.io/availity-react/form/components/form/)
