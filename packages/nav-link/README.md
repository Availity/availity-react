# @availity/nav-link

> links to use in portal apps to automatically adjust to keep navbar if opening on new tab

## Installation

```bash
npm install @availity/nav-link --save
```

### Documentation

-   [core](core/README.md) - > Core Logic

### Examples

Converting urls from easy to read/maintain to more complicated urls that keep the top nav on new tabs or when copied

Will only convert the href if target is newBody or if the current frame is newBody and target is \_self

Examples are based on [core](core/README.md) look in documentation for how to use in your framework

-   ## adding search params:

```javascript
    getLink({
        href: '/web/apps/exampleApp',
        search={
            example: 'searchParam'
        },
        target: 'something'
    });

    // {href: '/web/apps/exampleApp?example=searchParam', target: "something"}
```

before any conversions for top nav, or if none are needed, navLink will add any search params needed to the href.

-   if targeting the body iframe, will adjust urls to the loadApp url

    -   ```javascript
        // if in the body iframe target '_self' will be adjusted, and default target is '_self'
        getLink({
            href: '/public/apps/dashboard', // default home page url for body
        });
        // {href: '/public/apps/home/#!/', target: '_top'}
        ```

    -   ```javascript
        getLink({
            href: '/public/apps/dashboard' // default home page url for body
            target: '_self'
        });
        // {href: '/public/apps/home/#!/', target: '_top'}
        ```
    -   ```javascript
        getLink({
            href: '/public/apps/dashboard' // default home page url for body
            target: 'newBody' // name of body frame
            });
            // {href: '/public/apps/home/#!/', target: '_top'}
        ```
    -   ```javascript
        getLink({
            href: '/public/apps/myApp' // default home page url for body
            target: 'newBody' // name of body frame
            });
            // { href: '/public/apps/home/#!/loadApp?appUrl=%2Fpublic%2Fapps%2FmyApp', target: '_top' }
        ```

-   when creating a loadApp url, navSearch can also be added if needed

```javascript
getLink({
    href: '/public/apps/myApp' // default home page url for body
    target: 'newBody', // name of body frame
    navSearch: { hello: 'world' }
    });
    // { href: '/public/apps/home/#!/loadApp?appUrl=%2Fpublic%2Fapps%2FmyApp&hello=world', target: '_top' }
```
