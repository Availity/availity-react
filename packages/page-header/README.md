# @availity/page-header

> The standard page header for Availity Portal Applications

[![Version](https://img.shields.io/npm/v/@availity/page-header.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/page-header)

## Installation

```bash
npm install-peerdeps @availity/page-header --save
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
- **`feedbackProps`**: See [Feedback](../feedback/README.md). Props to send to `<Feedback />` component
- **`crumbs`**: Array(Object) or [BreadCrumbs](../breadcrumbs/README.md) . Optional. Array of Objects contains `name` (String) and `url` (string) properties. Optional. The ancestor pages which gets passed to the `Breadcrumbs` component. See the children props sections of the @availity/Breadcrumbs documentation
- **`component`**: Component. Optional. Allow rendering of an optional component in the top right of the header.
- **`clientId`**: String. Optional. client id to use in [spaces](../spaces/README.md) to fetch the payer's logo
- **`iconSrc`**: String. Optional. Image source for `AppIcon` instead of `appAbbr`
- **`iconAlt`**: String. Required if `iconSrc`. Image alt property of `AppIcon`

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
  Payer Space
</PageHeader>
// ...
```
