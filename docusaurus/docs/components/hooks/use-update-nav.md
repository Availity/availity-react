---
title: useUpdateNav
---

This hook uses `react-router-dom` and `@availity/message-core` to send a browser message to the nav every time the url changes. It does not accept any arguments or return any data.

### Example

The hook must be a descendant of a `Router` component. In the example below we have the app setup to only need to use the hook once. This is the recommended setup.

```jsx
import React from 'react';
import { useUpdateNav } from '@availity/hooks';
import { Router, Routes, Route } from 'react-router-dom';
import { Home, Search } from './components';

const Example = () => {
  useUpdateNav();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Example />
    </Router>
  );
};
```

It is also possible to make a wrapper component using the `useUpdateNav` hook and `Outlet` component from `react-router-dom`.

```jsx
import React from 'react';
import { useUpdateNav } from '@availity/hooks';
import { Router, Routes, Route, Outlet } from 'react-router-dom';
import { Home, Search } from './components';

const RouteWrapper = () => {
  useUpdateNav();

  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <Route element={<RouteWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Router>
  );
};
```
