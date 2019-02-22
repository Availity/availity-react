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

This is the provider component for pagination to work. All the inner components must be wrapped in this tag in order to recieve all their required properties. The component handles search queries for filtering, and sorting the items.

#### Props

- **`items`**: Array or Function, required. If Array, defaults `totalCount` to length of array, and pages values are sliced from the Array. If a function, will call it with the current page as an argument and expected to return an array of items.
- **`totalItems`**: number. optional. You can optionally provide the total number of items to the component in the case you are managing the total item count outside.
- **`itemsPerPage`**: number. default `10`. The total amount of items to render at a time. ( After all the filtering )
- **`searchKeys`**: array. default `Object.keys()`. An array of keys of the objects you are wanting to search on
- **`search`**: string. optional. The search value you want to filter the items on.
- **`sort`**: object. optional. An object containing what key to sort on as well as the sort order.

#### `sort` Object
```json
{
    key: "name",
    ascending: true
}
```



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
- **`loading`**: boolean. default `false`. If true will call BlockUI to simulate a loading state.
- **`component`**: Node. `required`. The Component to render each item into.

#### Example usage

```javascript
import React from 'react';
import { PaginationContent } from '@availity/pagination';
// ...
<PaginationContent
  loadingMessage="loading"
  component={Component}
/>;
```


### usePagination

This is a custom hook for grabbing any Pagination Data you may need from the `Pagination` provider.

### Returns
```json
{
    pages: Array[[1],[2]...],
    total: number,
    page: {
        number: number,
        items: Array
    },
    lower: number,
    upper: number,
    setPage: function
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