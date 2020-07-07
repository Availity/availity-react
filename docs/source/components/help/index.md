---
title: Help
summary: Help Wrapper for Oxygen Learning Docs on the Portal
---

## Installation

```bash
npm install @availity/help --save
```

## Example

```jsx viewCode=true
import HelpProvider, { Help } from '@availity/help';

<HelpProvider>
  <Help type="vendor" id="some-id-for-top-nav-context">
    Some Content You May need documentation for.
  </Help>
</HelpProvider>;
```
