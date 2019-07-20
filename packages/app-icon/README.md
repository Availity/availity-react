# @availity/app-icon
> Availity UI Kit application icon react component.

[![Version](https://img.shields.io/npm/v/@availity/app-icon.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/app-icon)

## Installation

```bash
npm install @availity/app-icon --save
```

### Usage

```javascript
import React from 'react';
import AppIcon from '@availity/app-icon';
// ... 
<AppIcon>
  {/* ... */}
</AppIcon>
// ...
```

#### AppIcon (Default export)
A component which outputs one of the "App Icons" from [Availity UI Kit](http://availity.github.io/availity-uikit/v3/components#App-Icons)

##### Props

- **`size`**: string, optional. Potential values: `"lg"`, `"xl"`
- **`color`**: string, optional. Potential values: `"black"`, `"blue"`, `"green"`, `"orange"`. Default value: `"black"`
- **`branded`**: boolean, optional. Triggers "branded" styles.
- **`src`**: string, optional. If image source is provided will render this instead of children.
- **`alt`**: string, required for `src` prop. the alt property for your image source
- All other props will be passed through; `className` will be merged.

##### Usage

```javascript
import React from 'react';
import AppIcon from '@availity/app-icon';
// ... 
<AppIcon title="Payer Space" color="green" branded size="xl">PS</AppIcon>
// ...
```