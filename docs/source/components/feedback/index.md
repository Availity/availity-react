---
title: Feedback
summary: Availity feedback with smiley faces react component.
---

## Installation

```bash
npx install-peerdeps @availity/feedback --save
```

## Example

```jsx live=true
import Feedback from '@availity/feedback';

<div className="w-100 d-flex flex-column justify-content-around align-items-start">
  <Feedback
    appName="Payer Space"
    prompt="Please provide some feedback"
    color="primary"
  >
    Provide Feedback
  </Feedback>
</div>
```