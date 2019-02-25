# @availity/icon

> Simple icon component that is a wrapper for the icons in the availity uikit. **[Icon List](http://availity.github.io/availity-uikit/v3/icons)**

## Installation

```bash
npm install @availity/icon --save
```

### Usage

```javascript
import React from 'react';
import Icon from '@availity/icon';
// ...
<Container>
    <Icon name="home" size="3" />
</Container>
// ...
```

#### Arguments

- **`name`**: String. Required. The name of the icon you want to display. **[Icon List](http://availity.github.io/availity-uikit/v3/icons)**
- **`size`**: String or Number. Optional. The size from the list of `['lg','xl','2x','3x','4x','5x']` for the size of the icon.

Note the name of the icon you put in doesn't require the `icon-` prefix just the name given in the availity uikit docs.