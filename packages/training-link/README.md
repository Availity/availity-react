# @availity/training-link

> Component for allowing link out to training in the Header component

[![Version](https://img.shields.io/npm/v/@availity/training-link.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/training-link)

## Installation

```bash
npm install @availity/training-link --save
```

### Usage

```javascript
import React from 'react';
import TrainingLink from '@availity/training-link';
// ... 
<TrainingLink link={} name={} />
// ...
```

#### TrainingLink (Default export)
Provide a link for training videos for your app

##### Props

- **`link`**: {propType (eg.string)}. {Required}. {link to training video}
- **`name`**: {propType (eg.string)}. {Required}. {name of your app to make the sentence complete}

##### TrainingLink Usage

```javascript
import React from 'react';
import TrainingLink from '@availity/training-link';
// ... 
<TrainingLink>
  {/* ... */}
</TrainingLink>
// ...
```