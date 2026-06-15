---
title: Authorize
---

Check user permissions to see if the current user is authorized to see your content.

[![Version](https://img.shields.io/npm/v/@availity/authorize.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorize)

## Installation

### NPM

```bash
npm install @availity/authorize @availity/api-axios axios
```

### Yarn

```bash
yarn add @availity/authorize @availity/api-axios axios
```

This package uses [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching. You must add a [QueryClientProvider](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider) to your app if you do not already have one.

## Usage

```jsx
import React from 'react';
import Authorize from '@availity/authorize';

const Example = () => (
  <Authorize permissions={['1234']} unauthorized={<p>Access denied.</p>}>
    <p>You have permission to see this content.</p>
  </Authorize>
);
```

## Authorize Component

Component for showing content based on the user's permissions.

### Props

#### `permissions: (string | string[])[]`

**Required.** Permission ID string, number, or array. Nested arrays use AND logic; top-level items use OR logic. Example: `['1234', '2345', ['3456', '4567']]` means `'1234' OR '2345' OR ('3456' AND '4567')`.

#### `resources?: (string | string[])[]`

When present, validates the permission contains the specified resource(s). Same AND/OR logic as `permissions`.

#### `loader?: boolean | ReactNode`

Loading indicator. When `true`, renders `BlockUi`. When a node, renders that node. When `false`, renders nothing. **Default:** `true`.

#### `organizationId?: string`

Validates the permission is assigned to the specified organization.

#### `customerId?: string`

Validates the permission is assigned to the specified customer.

#### `region?: string | boolean`

When a string, validates the permission is assigned in that region. When `true`, validates against the current region. **Default:** `true`.

#### `unauthorized?: ReactNode`

Content rendered when the user does _not_ have the required permissions.

#### `children: ReactNode`

Content rendered when the user _does_ have the required permissions.

#### `negate?: boolean`

Inverts authorization logic. Authorized users see `unauthorized` content and vice versa.

#### `queryOptions?: UseQueryOptions`

Options passed to the underlying `useQuery` hook from `@tanstack/react-query`. Allows customizing caching, refetching, and other query behaviors.

## useAuthorize Hook

Hook that checks permissions and returns the authorization state.

```jsx
import React from 'react';
import { useAuthorize } from '@availity/authorize';

const Component = () => {
  const { authorized, isLoading } = useAuthorize(
    ['1234', '5678'],
    { region: 'FL' },
    { enabled: true }
  );

  if (isLoading) return <p>Loading...</p>;
  return authorized ? <p>Authorized</p> : <p>Not authorized</p>;
};
```

### Parameters

- **`permissions`**: `(string | string[])[]` — Required. Same logic as the component prop.
- **`parameters`**: Object — Optional. Default: `{}`.
  - **`organizationId`**: `string` — Validate against an organization.
  - **`customerId`**: `string` — Validate against a customer.
  - **`region`**: `string | boolean` — Validate against a region. **Default:** `true`.
  - **`resources`**: `(string | string[])[]` — Validate against resources.
- **`queryOptions`**: `UseQueryOptions` — Optional. Options passed to the underlying `useQuery` hook (e.g., `enabled`, `retry`, `staleTime`).

### Return Value

```ts
type ReturnObject = {
  authorized: boolean;
  isLoading: boolean;
};
```
