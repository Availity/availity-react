# @availity/progress

> Availity Progress Bar

[![Version](https://img.shields.io/npm/v/@availity/progress.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/progress)

## Installation

```bash
npm install @availity/progress --save
```

### Usage

```javascript
import React from 'react';
import Progress from '@availity/progress';

// ...
  <div>
    <p>50% Complete</p>
    <Progress animated={false} striped complete={false} value={50} max={100} />
  </div>
// ...
```

#### Progress (Default export)
Availity Progress Bar

##### Props
- **`value`**: Number. Optional. Default 0. The amount the progress bar that should be filled (relative to the `max`)
- **`max`**: Number. Optional. Default 100. The maximum amount of the progress bar
- **`animated`**: Boolean. Optional. Triggers the "animated" style in the progress bar.
- **`striped`**: Boolean. Optional. Triggers the "striped" style in the progress bar.
- **`complete`**: Boolean. Optional. Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar
- **`color`**: String. Optional. Default "success". The color of the progress bar
