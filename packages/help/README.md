# @availity/help

> Context Provider to assist with Help Menu on Portal for specific pages
> Field Help Icon to import and access field level support

[![Version](https://img.shields.io/npm/v/@availity/favorites.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/help)


## Installation

```bash
npm install @availity/help --save
```

## Provider Example

```jsx viewCode=true
import HelpProvider, { Help } from '@availity/help';

<HelpProvider>
  <Help type="vendor" id="some-id-for-top-nav-context">
    Some Content You May need documentation for.
  </Help>
</HelpProvider>;
```

## Field Level Help Icon Example

```jsx viewCode=true
import { FieldHelpIcon } from '@availity/help';
<div>
  Select A Provider <FieldLevelIcon id="Express_Entry_Fields" />
</div>;
```

## Field Help Props

### `id: string`

The field Help ID **Required**

### `color?: string`

The bootstrap 3 color of the icon. **Default:**`primary`

### `size?: string`

The size of the help icon. **Default:** `1x`
