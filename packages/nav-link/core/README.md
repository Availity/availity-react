# @availity/nav-link/core

> linkBuilder to verify link objects and build them out, can also convert to navigation links to keep top nav in new tabs and such

## Installation

```bash
npm install @availity/nav-link --save
```

### Usage

```javascript
import React from 'react';
import linkBuilder from '@availity/nav-link/core';

const { href, target } = linkBuilder.getLink(linkObject);
```

#### linkObject structure

all other key/value pairs in the linkObject will be ignored and returned by functions

-   href: link href/url such as an `<a>` tag
-   target: link target such as an `<a>` tag
-   search: optional query params in an object, added to the href using `query-string`
-   navSearch: optional query params in an object, added to top nav url if converted to a topNav url

### Methods

-   `setDefaultLink`: updates the default link values to compare against, default link is `{ href: '#', target: 'newBody' }`
-   `isDefault(linkObject)`: returns T/F if links href/target matches the default link or the topNav url equivalent-
-   `getLink(linkObj)`: validates link object, adds search params, and change to a nav link
-   `addQuery(href, search)`: uses `querty-string` to updated href with new search params
-   `validateLink(linkObj)`: checks against href/target and applies default values as needed
-   `checkTopNavLink(linkObj)`: checks if link should be a top nav link and changes it.
