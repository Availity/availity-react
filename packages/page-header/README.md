# @availity/page-header

> The standard page header for Availity Portal Applications

## Installation

```bash
npm install @availity/page-header --save
```

### Usage

```javascript
import React from 'react';
import PageHeader from '@availity/page-header';
// ...
<PageHeader appName="Applicaiton Name" />
// ...
```

#### PageHeader (Default export)
The standard Availity application header which appears at the top of the page. It can include an app icon, payer logo, and/or the feedback loop.

##### Props

- **`children`**: Node. Optional. This value will appear at the `h1` of the page. Overrides the `appName` to allow for custom elements (such as a "beta" tag) Default: value of `appName` prop
- **`appName`**: String. Required. Name of the application
- **`spaceName`**: String. Optional. Payer Space Name of the space in which this page is under.
- **`spaceId`**: String. Optional. Payer Space ID of the space in which this page is under.
- **`appAbbr`**: String. Optional. If provided and payerId is not provided the app icon will appear.
- **`iconColor`**: String, optional. Potential values: `"black"`, `"blue"`, `"green"`, `"orange"`. Only used if the app icon should appear. Default value: `"black"`
- **`branded`**: String. Optional. Triggers the app icon's "branded" styles. Only used if the app icon should appear.
- **`payerId`**: String. Optional. The ID of the payer if the application is payer specific. If provided the payer logo will appear and not the app icon.
- **`feedback`**: Boolean. Optional. If `true` the feedback loop button will appear. Default: `false`.
- **`crumbs`**: Array. Optional. Array of Objects contains `name` (String) and `url` (string) properties. Optional. The ancestor pages which gets passed to the `Breadcrumbs` component. See the children props sections of the @availity/Breadcrumbs documentation
- **`CustomBreadcrumbs`**: Node - @availity/Breadcrumbs component. Optional (`crumbs` prop must be null). An alternative to the `crumbs` prop. Must be a Breadcrumbs component (@availity/breadcrumbs) which includes custom BreadcrumbItems (from 'reactstrap')
- **`component`**: Component. Optional. Allow rendering of an optional component in the top right of the header.

##### PageHeader Usage

```javascript
import React from 'react';
import PageHeader from '@availity/page-header';
// ...
<PageHeader
  appName="Payer Space"
  appAbbr="PS"
  iconColor="blue"
  feedback
/>

<PageHeader
  appName="Payer Space"
  payerId="PayerID"
  spaceName="Payer's Space"
  spaceId="73162546201441126239486200007187"
>
  Payer Space<sup>beta</sup>
</PageHeader>
// ...
```
