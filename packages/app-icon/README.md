# @availity/app-icon

> Availity UI Kit application icon react component.

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
- All other props will be passed through; `className` will be merged.

##### Usage

```javascript
import React from 'react';
import AppIcon from '@availity/app-icon';
// ... 
<AppIcon title="Payer Space" color="green" branded size="xl">PS</AppIcon>
// ...
```