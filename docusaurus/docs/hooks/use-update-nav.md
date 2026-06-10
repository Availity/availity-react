---
title: useUpdateNav
---

Hook that sends a browser message to the portal navigation every time the URL changes. Uses `react-router-dom` and `@availity/message-core`.

## Usage

The hook must be used within a `Router` component.

```jsx
import React from 'react';
import { useUpdateNav } from '@availity/hooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContent = () => {
  useUpdateNav();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);
```

Alternatively, use with `Outlet` as a layout wrapper:

```jsx
import React from 'react';
import { useUpdateNav } from '@availity/hooks';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

const RouteWrapper = () => {
  useUpdateNav();
  return <Outlet />;
};

const App = () => (
  <Router>
    <Routes>
      <Route element={<RouteWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  </Router>
);
```

## Parameters

None.

## Return Value

None.
