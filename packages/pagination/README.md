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
<Pagination
  totalCount={totalCount}
  page={this.state.page}
  onPageChange={this.handlePageChange}
/>;
```

```javascript
import React from 'react';
import { avNotificationApi } from '@availity/api-axios'; // this can be any API resource
import { AyncPagination } from '@availity/pagination';
// ...
<AyncPagination resource={avNotificationApi} getResult="notifications" />;
```

### Pagination (Default export)

This is the raw pagination which handles displaying the pager and some logic around the page options displayed based on the props.

#### Props

- **`totalCount`**: number. Optional, but needed if you want the page numbers to display between the previous and next buttons. This is used with the itemsPerPage to determine the number of pages.
- **`pagePadding`**: number. default: `2`. When not in the "simple" usage, the number of pages to show on either side of the active page. If the active page is "close" to the first or last page, the other side will be "padded".
- **`page`**: number. The current active page. This is used to mark the page as active as well as potentially disable the previous and next button when on the first and last page respectfully
- **`itemsPerPage`**: number. default: `10`. The number of items to intended to be displayed per page. This is used with the totalCount to determine the number of pages.
- **`onPageChange`**: function. required. A callback function to inform you that the user has taken an action to change the page. The page the user wants to go to will be provided as an argument to the callback function.
- **`prevBtn`**: String or `false`. default: `'« Prev'`, when a string the text that will appear in the "previous" button, when `false` the "previous" button will not be rendered
- **`nextBtn`**: String or `false`. default: `'Next »'`, when a string the text that will appear in the "next" button, when `false` the "next" button will not be rendered
- **`size`**: string, initial possible values: 'sm', 'md', 'lg'. default: `'sm'`
- **`align`**: string, possible values: 'start', 'center', 'end', 'between'. default: `'start'`. How to align the pagination buttons.
  - **`'start'`**: align to the left
  - **`'center'`**: align to the center
  - **`'end'`**: align to the right
  - **`'between'`**: "justifies" the content so that space is between the buttons, mostly useful for the "simple" case (see next prop)
- **`simple`**: boolean. default: `false`, when `true` only the previous and next buttons will be displayed.
- **`unstyled`**: boolean, default: `true`, when `true` the buttons do not look like buttons (no border, no background).
- **`className`**: string, adds additional classNames to the outer most rendered DOM element.

#### Example usage

```javascript
import React from 'react';
import Pagination from '@availity/pagination';
// ...
<Pagination
  totalCount={totalCount}
  itemsPerPage={25}
  page={this.state.page}
  onPageChange={this.handlePageChange}
/>;
```

### AsyncPagination

AsyncPagination is an advanced component which helps automatically load and display pages of data from an Availity API given that API's resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios))

#### Props

- **`children`**: function, required. Function as children. This function will be called with an array of items for the current page (or an empty array for the initial render), an object of the current state, including `loading`: boolean indicating that a page is being loaded and `error`: if one occurred in the most recent request (or null). This function is expected to map the items array to what you want them to look like.
- **`requestConfig`**: object, optional. Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request.
- **`parameters`**: object, optional. Object which will be used to create querystring parameters in the request, useful for specifying additional parameters in the query (such as `q`)
- **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
- **`getResult`**: string or function, optional but most likely needed. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response (simple meaning not handling dot-notation for nested objects, if you need that provide a function.)
- **`placement`**: string, The placement of the pagination component(s) around the children. Possible values: 'top', 'bottom', 'both'. default: `'both'`,
- **`scroll`**: `"window"`, `"list"`, or `false`. When `"list"` the viewport will be scrolled to the top of the list when the page is changed. When `"window"`, it will scroll to the top of the window. When `false` it will not scroll. Default: `"list"`
- **`loader`**: string or boolean, default: `true`. Displays the loading indicator when a page is being loaded. When `true` no _message_ is displayed (only the loading dots). When a string, the value will be displayed with the loading dots. When `false` the loader will not be displayed at all.
- **`pagePadding`**: number. default: `2`. When not in the "simple" usage, the number of pages to show on either side of the active page. If the active page is "close" to the first or last page, the other side will be "padded".
- **`page`**: number. The current active page. This is used to mark the page as active as well as potentially disable the previous and next button when on the first and last page respectfully
- **`itemsPerPage`**: number. default: `10`. The number of items to intended to be displayed per page. This is used with the totalCount to determine the number of pages.
- **`onPageChange`**: function. required. A callback function to inform you that the user has taken an action to change the page. The page the user wants to go to will be provided as an argument to the callback function.
- **`prevBtn`**: String or `false`. default: `'« Prev'`, when a string the text that will appear in the "previous" button, when `false` the "previous" button will not be rendered
- **`nextBtn`**: String or `false`. default: `'Next »'`, when a string the text that will appear in the "next" button, when `false` the "next" button will not be rendered
- **`size`**: string, initial possible values: 'sm', 'md', 'lg'. default: `'sm'`
- **`align`**: string, possible values: 'start', 'center', 'end', 'between'. default: `'start'`. How to align the pagination buttons.
  - **`'start'`**: align to the left
  - **`'center'`**: align to the center
  - **`'end'`**: align to the right
  - **`'between'`**: "justifies" the content so that space is between the buttons, mostly useful for the "simple" case (see next prop)
- **`simple`**: boolean. default: `false`, when `true` only the previous and next buttons will be displayed.
- **`unstyled`**: boolean, default: `true`, when `true` the buttons do not look like buttons (no border, no background).
- **`className`**: string, adds additional classNames to the outer most rendered DOM element.
- **`page`**: number, optional, not recommended. Providing page along with `onPageChange` indicates you want to control the component and thus will be responsible for the component's "state" (which page is displaying). When the user clicks a page, `onPageChange` will be called with that page and you will be expected to perform any logic you need and update this `page` prop if the page needs to actual change.

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
