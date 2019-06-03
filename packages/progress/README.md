# @availity/progress

> Availity Progress Bar

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
    <Progress animated={false} striped complete={false} width={50} />
  </div>
// ...
```

#### Progress (Default export)
Availity Progress Bar

##### Props
- **`width`**: Number. Optional. Default 0. The percentage of the progress bar that should be filled.
- **`animated`**: Boolean. Optional. Triggers the "animated" style in the progress bar.
- **`striped`**: Boolean. Optional. Triggers the "striped" style in the progress bar.
- **`complete`**: Boolean. Optional. Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar
- **`color`**: String. Optional. Default "success". The color of the progress bar
