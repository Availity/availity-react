# @availity/pagination

> Pagination, the Availity way.

## Installation

```bash
npm install @availity/pagination --save
```

### Usage

```javascript
import React from 'react';
import Pagination from '@availity/pagination';
// ...
<Pagination items={items}>
    <Pagination.Content component={Component} />
    <Pagination.Controls directionLinks />
</Pagination>;
```

### Pagination (Default export)

This is the provider component for pagination to work. All the inner components must be wrapped in this tag in order to recieve all their required properties.

#### Props

- **`items`**: Array or Function, required. If Array, defaults `totalCount` to length of array, and pages values are sliced from the Array. If a function, will call it with the current page as an argument and expected to return an array of items.
- **`itemsPerPage`**: number. default `10`. The total amount of items to render at a time. ( After all the filtering )
- **`onPageChange`**: function. optional. When the user changes the page, this will be called after the new page has been set.
- **`watchList`**: Array. optional. Array of data points you want pagination to re-render if changed. This is helpful for when the function is passed in the `items` prop and you want to force call the pagination update.
- **`defaultPage`**: number. optional. The starting page to use when the component mounts.

#### Example usage

```javascript
import React from 'react';
import Pagination from '@availity/pagination';
// ...
<Pagination itemsPerPage={25} items={this.state.items}>
  <Pagination.Content component={Component} />
</Pagination>;
```



### PaginationControls

This is the controls for the pagination, with the page selector and optionally verbiage and dropdown to give more details and select items per page.

#### Props

- **`directionLinks`**: boolean. default `false`. If enabled, will show next and previous arrows on the controls
- **`autoHide`**: boolean. default `true`. If enabled and there are no items, the component will be hidden.
- **`pageRange`**: number. default 5. The number of pages to display at a time.
- **`marginPages`**: number. default 2. The number of pages you want to display on the ends when there are more pages than the page range.
#### Example usage

```javascript
import React from 'react';
import { PaginationControls } from '@availity/pagination';
// ...
<PaginationControls
  directionLinks
/>;
```


### PaginationContent

This is the container of all the items that will be rendered to the DOM when the `Pagination` provider recieves items. All you have to do is place the component nested under the `Pagination` component and it does the rest for you.

#### Props

- **`loadingMessage`**: string. optional. The message to render with the loading bar when in the loading state
- **`loader`**: boolean. default `false`. If true will call BlockUI to simulate a loading state if the provider is loading.
- **`component`**: Node. `required`. The Component to render each item into.
- **`itemKey`**: String. `required`. The key of the object rendered in the component to be used during mapping

#### Example usage

```javascript
import React from 'react';
import { PaginationContent } from '@availity/pagination';
// ...
<PaginationContent
  loadingMessage="loading"
  component={Component}
  itemkey="id"
/>;
```


### usePagination

This is a custom hook for grabbing any Pagination Data you may need from the `Pagination` provider.

### Returns
```json
{
    pageCount: number,
    total: number,
    page: Array,
    currentPage: number,
    lower: number,
    upper: number,
    setPage: function,
    loading: boolean
}
```

#### Example usage

```javascript
import React from 'react';
import { usePagination } from '@availity/pagination';
// ...
const PageSetter = () => {
    const { page, setPage } = usePagination();

    return <input type='text' value={page} onChange={({target}) => setPage(target.value)} />
};
```

### PaginationContext

If you are using a class component, you can subscribe to the pagination by using this context.


#### Example usage

```javascript
import React from 'react';
import { PaginationContext } from '@availity/pagination';
// ...
class PageSetter extends React.Component {
  render() { 
    const { page, setPage } = this.context;

    return <input type='text' value={page} onChange={({target}) => setPage(target.value)} />
  }
}

PageSetter.contextType = PaginationContext;
```

### AvResourcePagination

This is a wrapper around the `Pagination` Component that can be used for paginating `@availity/api-axios` resources.  

#### Props

*   **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
*   **`getResult`**: String or Function. Optional. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response ("simple" meaning not handling dot-notation for nested objects, if you need that provide a function.)
*   **`parameters`**: Object. Optional. Object which will be used to create querystring parameters in the request.

All props from the `Pagination` Component are passed in here.
#### Example usage

```javascript
import React from 'react';
import { AvResourcePagination, PaginationControls } from '@availity/pagination';
import { avOrganizationsApi } from '@availity/api-axios';

// ...
<AvResourcePagination
  resource={avOrganizationsApi}
  itemsPerPage={25}
>
    <PaginationControls />
</AvResourcePagination>
```
