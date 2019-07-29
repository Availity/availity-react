# @availity/block-ui

> Easy way to block the user from interacting with your UI.

[![Version](https://img.shields.io/npm/v/@availity/block-ui.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/block-ui)

This library contains easy to use components to prevent the user from interacting with the user interface based on some conditions.

There is also a separate component which works with redux to help block and unblock automatically based on redux action types. See the ReduxBlockUi component for more details.

## Installation

```bash
npm install @availity/block-ui --save
```

### Usage

```javascript
import React from 'react';
import BlockUI from '@availity/block-uo';
// ...
<Container>
    <BlockUI blocking={true}>
        Some Conent
    </BlockUI>
</Container>
// ...
```

#### Arguments

- **`blocking`**: boolean. Optional. Whether or not to show the blocking state. Default `false`
- **`keepInView`**: boolean. Optional. f you have a large/long section which you are blocking, you may notice that the loader/message isn't always in the viewport and thus is not visible to the user. To help with this, you can pass the keepInViewprop. When keepInView is true, the loader will center itself within the part of the blocked container which is in the viewport. Note: This only affect vertical scrolling. Click the "Toggle Block" button in the example below and scroll down. default `false`
