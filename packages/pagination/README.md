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
<Pagination items={this.state.items} />;
```

```javascript
import React from 'react';
import { avNotificationApi } from '@availity/api-axios'; // this can be any API resource
import { AyncPagination } from '@availity/pagination';
// ...
<AyncPagination resource={avNotificationApi} getResult="notifications" />;
```

### PaginationControls

This is the controls for the pagination, with the page selector and optionally verbiage and dropdown to give more details and select items per page.

#### Props

- **`align`**: string, possible values: 'start', 'center', 'end', 'between'. default: `'start'`. How to align the pagination buttons.
  - **`'start'`**: align to the left
  - **`'center'`**: align to the center
  - **`'end'`**: align to the right
  - **`'between'`**: "justifies" the content so that space is between the buttons, mostly useful for the "simple" case (see next prop)
- **`pageButtonsAlign`**: defaults to main align to match, otherwise can adjust buttons alignment specifically
- **`withSelector`**: boolean, default true, will hide selector completely if false

For Page Buttons

- **`pagePadding`**: number. default: `2`. When not in the "simple" usage, the number of pages to show on either side of the active page. If the active page is "close" to the first or last page, the other side will be "padded".
- **`page`**: number. The current active page. This is used to mark the page as active as well as potentially disable the previous and next button when on the first and last page respectfully
- **`onPageChange`**: function. required. A callback function to inform you that the user has taken an action to change the page. The page the user wants to go to will be provided as an argument to the callback function.
- **`firstBtn`**: String or bool, default: true. when True displays `'«« First'`, when a string the text that will appear in the "first" button, when `false` the "first" button will not be rendered.
- **`prevBtn`**: String or bool, default: true. when True displays `'« Prev'`, when a string the text that will appear in the "previous" button, when `false` the "previous" button will not be rendered.
- **`nextBtn`**: String or bool, default: true. when True displays `'Next »'`, when a string the text that will appear in the "next" button, when `false` the "next" button will not be rendered.
- **`lastBtn`**: String or bool, default: true. when True displays `'Last »»'`, when a string the text that will appear in the "last" button, when `false` the "last" button will not be rendered.
- **`size`**: string, initial possible values: 'sm', 'md', 'lg'. default: `'sm'`
- **`simple`**: boolean. default: `false`, when `true` only the previous and next buttons will be displayed.
- **`unstyled`**: boolean, default: `true`, when `true` the buttons do not look like buttons (no border, no background).
- **`pageCount`**: number. total number of pages, can be used instead of `totalCount` with `itemsPerPage`
- **`itemsPerPage`**: number. default: `10`. The number of items to intended to be displayed per page. This is used with the totalCount to determine the number of pages.
- **`totalCount`**: number. Optional, but needed if you want the page numbers to display between the previous and next buttons. This is used with the itemsPerPage to determine the number of pages.

For Selector:

- **`perPageOptions`**: Array. Optional, if provided, used to display the dropdown with different `itemsPerPage` values. Either an array of numbers displayed with `optionLabel` text, or an object with `value` and `label` keys.
- **`itemsPerPage`**: Number, default: `10`. If using `perPageOptions` this value will be the default value selection.
- **`optionLabel`**: String or Function. If undefined, options default to `itemLabel` value or `'results'` as string. if a string, displays `${value} ${optionLabel}` in dropdown. If function, displays `optionLabel(value)` results.
- **`itemLabel`**: String. used for string `Showing ${itemLabel || 'Items'}`
- **`onCountChange`**: function, called with value whenever dropdown is selected.

#### Example usage

```javascript
import React from 'react';
import { PaginationControls } from '@availity/pagination';
// ...
<PaginationControls
  totalCount={totalCount}
  itemsPerPage={25}
  page={this.state.page}
  onPageChange={this.handlePageChange}
/>;
```

### Pagination (Default export)

This is the raw pagination which handles displaying the pager and some logic around the page options displayed based on the props.

#### Props (in addition to PaginationControl props)

values mentioned set from these props are default values to paginationControls, if they are passed in as props to Pagination, those props will be used

- **`items`**: Array or Function, required. If Array, defaults `totalCount` to length of array, and pages values are sliced from the Array. If a function, will call it with the current page, itemsPerPage, and `itemExtraArgs` if provided. The function can be async and can return an array of items or an object with items, and totalCount.
- **`children`**: function, required. Function as children. This function will be called with an array of items for the current page (or an empty array for the initial render), an object of the current state, including `loading`: boolean indicating that a page is being loaded and `error`: if one occurred in the most recent request (or null). This function is expected to map the items array to what you want them to look like.
- **`placement`**: string, The placement of the pagination component(s) around the children. Possible values: 'top', 'bottom', 'both'. default: `'both'`,
- **`hideOnSinglePage`**: boolean. If `true`, will not display the PaginationControls if only one page of items to display.
- **`scroll`**: `"window"`, `"list"`, or `false`. When `"list"` the viewport will be scrolled to the top of the list when the page is changed. When `"window"`, it will scroll to the top of the window. When `false` it will not scroll. Default: `"list"`
- **`loader`**: string or boolean, default: `true`. Displays the loading indicator when a page is being loaded. When `true` no _message_ is displayed (only the loading dots). When a string, the value will be displayed with the loading dots. When `false` the loader will not be displayed at all.
- **`loading`**: boolean. Optionally turn on loading indicator manually, if false, will still show loading indicators with async `items` function.

#### Example usage

```javascript
import React from 'react';
import Pagination from '@availity/pagination';
// ...
<Pagination itemsPerPage={25} items={this.state.items}>
  {items =>
    items.map(item => (
      <div key={item.id}>
        {item.name.first} {item.name.last}
      </div>
    ))
  }
</Pagination>;
```

### AvResourcePagination

AvResourcePagination is a component which wraps Pagination with logic which helps automatically load and display pages of data from an Availity API given that API's resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios))

#### Props (in addition to the Pagination and PaginationControls props)

- **`requestConfig`**: object, optional. Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request.
- **`parameters`**: object, optional. Object which will be used to create querystring parameters in the request, useful for specifying additional parameters in the query (such as `q`)
- **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
- **`getResult`**: string or function, optional but most likely needed. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response (simple meaning not handling dot-notation for nested objects, if you need that provide a function.)

#### Example usage

```javascript
import React from 'react';
import { avNotificationApi } from '@availity/api-axios'; // this can be any API resource
import { AyncPagination } from '@availity/pagination';
// ...
<AyncPagination
  resource={avNotificationApi}
  getResult="notifications"
  itemsPerPage={25}
>
  {items =>
    items.map(item => (
      <div key={item.id}>
        {item.name.first} {item.name.last}
      </div>
    ))
  }
</AyncPagination>;
```
