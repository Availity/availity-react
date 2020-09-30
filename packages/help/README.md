# @availity/help

> Context Provider to assist with Help Menu on Portal for specific pages
> Field Help Icon to import and access field level support

[![Version](https://img.shields.io/npm/v/@availity/favorites.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/help)


## Installation

```bash
npm install @availity/help --save
```

## Page Level Help Example

```jsx viewCode=true
import HelpProvider, { Help } from '@availity/help';

<HelpProvider>
  <Help type="provider" id="1234-5678-9101-1213">
    Some Content You May need documentation for.
  </Help>
</HelpProvider>;
```
## Page Level Help Props

### `id: string`

The page level help ID **Required**

### `type: string`

The page level help type: ie.: provider | vendor | payer | insight. **Required**


## Field Level Help Icon Example

```jsx viewCode=true
import { FieldHelpIcon } from '@availity/help';
<div>
  Select A Provider <FieldHelpIcon id="1234-5678-910" />
</div>;
```

## Field Help Props

### `id: string`

The field Help ID **Required**

### `color?: string`

The bootstrap 3 color of the icon. **Default:**`primary`

### `size?: string`

The size of the help icon. **Default:** `1x`
